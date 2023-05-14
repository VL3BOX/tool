<template>
    <app-layout slug="database" icon="database">
        <template #left>
            <!-- 筛选区域 -->
            <database-filter :type="type" :client.sync="client" :query="query"></database-filter>
            <!-- 其他应用跳转区域 -->
            <app-nav></app-nav>
        </template>
        <div class="v-database" v-loading="loading">
            <!-- Type切换选项卡 -->
            <database-tabs :client="client" :type.sync="type" :hasRight="hasRight"></database-tabs>
            <h4 class="u-newest-tip" v-if="isNewest">最新数据</h4>
            <!-- 列表区域 -->
            <div class="m-list" v-if="data[type].length">
                <component
                    v-for="(item, index) in data[type]"
                    :key="`${type}_${index}`"
                    :is="item_component[type]"
                    :hasRight="hasRight"
                    :type="type"
                    :data="item"
                ></component>
                <!-- 分页 -->
                <template v-if="multiPage">
                    <el-button
                        class="m-more"
                        :class="{ show: hasNextPage }"
                        type="primary"
                        icon="el-icon-arrow-down"
                        @click="appendPage"
                        >加载更多</el-button
                    >
                    <el-pagination
                        class="m-pager"
                        background
                        layout="total, prev, pager, next,jumper"
                        :hide-on-single-page="true"
                        :page-size="per"
                        :total="total"
                        :current-page.sync="page"
                        @current-change="changePage"
                    ></el-pagination>
                </template>
            </div>
            <!-- 为空提示 -->
            <div v-else-if="isEmpty" class="m-empty">QAQ 没有找到符合条件的条目</div>
        </div>
        <template #right>
            <!-- 数据库版本信息 -->
            <database-versions></database-versions>
            <!-- 收藏数据 -->
            <database-star v-if="isLogin" :type="type" :client="client"></database-star>
        </template>
    </app-layout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import AppNav from "@/components/app_nav.vue";
import DatabaseFilter from "@/components/database/filter.vue";
import DatabaseTabs from "@/components/database/tabs.vue";
import DatabaseStar from "@/components/database/star.vue";
import DatabaseVersions from "@/components/database/versions.vue";
import ItemBuff from "@/components/database/item/buff.vue";
import ItemSkill from "@/components/database/item/skill.vue";
import ItemNpc from "@/components/database/item/npc.vue";
import ItemDoodad from "@/components/database/item/doodad.vue";

import { debounce } from "lodash";
import { getResource, getNewest } from "@/service/node";
import User from "@jx3box/jx3box-common/js/user";
import { getIsSuperAuthor } from "@/service/post";
import item_filter from "@/assets/data/database/item_filter.json";
import { mapState } from "vuex";

export default {
    name: "Database",
    components: {
        AppLayout,
        AppNav,
        DatabaseFilter,
        DatabaseTabs,
        DatabaseStar,
        DatabaseVersions,
    },
    data: () => ({
        item_component: {
            buff: ItemBuff,
            skill: ItemSkill,
            npc: ItemNpc,
            doodad: ItemDoodad,
        },
        type: "buff",
        query: {
            keyword: "",
            level: "",
            map: "",
            strict: false,
        },
        client: "std",

        data: {
            buff: [],
            skill: [],
            npc: [],
            doodad: [],
        },
        loading: false,
        isNewest: true,

        per: 10,
        page: 1,
        total: 0,
        pages: 0,

        hasRight: false,
    }),
    computed: {
        ...mapState(["isLogin"]),
        multiPage() {
            return !this.loading && this.pages > 1;
        },
        hasNextPage() {
            return this.total > 0 && this.page < this.pages;
        },
        isEmpty() {
            return !this.loading && this.query.keyword;
        },
    },
    methods: {
        getData(page = 1, append = false) {
            const params = {
                strict: this.query.strict,
                per: this.per,
                client: this.client,
                page: page,
            };

            if (this.type === "npc" && this.query.map) params.map = this.query.map;
            if (this.query.level) params.level = this.query.level;
            this.loading = true;
            this.isNewest = !this.query.keyword;
            const mode = isNaN(this.query.keyword) ? "name" : "id";
            (this.query.keyword
                ? getResource(this.type, mode, this.query.keyword, params)
                : getNewest(this.type, params)
            )
                .then((res) => {
                    const data = res.data;
                    this.total = data.total;
                    this.pages = data.pages;
                    let list = data.list;
                    const idProp = {
                        buff: "BuffID",
                        skill: "SkillID",
                    };
                    // 过滤不让显示的BUFF
                    if (item_filter[this.type])
                        list = list.filter((item) => !item_filter[this.type].includes(item[idProp[this.type]]));
                    if (append) {
                        this.data[this.type] = this.data[this.type].concat(list);
                    } else {
                        this.data[this.type] = list;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        search() {
            this.page = 1;
            this.getData();
        },
        appendPage() {
            this.page++;
            this.getData(this.page, true);
        },
        changePage(page) {
            this.page = page;
            this.getData(this.page);
        },
        debounceSearch: debounce(function () {
            this.search();
        }, 1000),
        initPermission() {
            getIsSuperAuthor(User.getInfo().uid).then((res) => {
                this.hasRight = this.isSuperAuthor = res.data?.data;
            });
        },
        initQuery() {
            this.query = {
                keyword: "",
                level: "",
                map: "",
                strict: false,
            };
            const { query, type, level } = this.$route.query;
            if (query) this.query.keyword = query;
            if (type) this.type = type;
            if (level) this.query.level = level;
            this.search();
        },
    },
    watch: {
        type() {
            this.search();
        },
        client() {
            this.search();
        },
        "$route.query": {
            handler: function () {
                this.initQuery();
            },
            deep: true,
        },
        query: {
            handler: function () {
                this.debounceSearch();
            },
            deep: true,
            immediate: true,
        },
    },
    mounted() {
        this.initPermission();
        this.initQuery();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/database.less";
</style>