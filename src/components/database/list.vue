<template>
    <div class="m-database-list" v-loading="loading">
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
                class="m-list-item"
                @click.native="$emit('toDetail', item)"
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
</template>

<script>
import DatabaseTabs from "@/components/database/tabs.vue";

import ItemBuff from "@/components/database/item/buff.vue";
import ItemSkill from "@/components/database/item/skill.vue";
import ItemNpc from "@/components/database/item/npc.vue";
import ItemDoodad from "@/components/database/item/doodad.vue";
import { mapState } from "vuex";

import { debounce } from "lodash";
import { getResource, getNewest } from "@/service/node";
import item_filter from "@/assets/data/database/item_filter.json";

export default {
    name: "DatabaseList",
    components: {
        DatabaseTabs,
    },
    props: {
        hasRight: {
            type: Boolean,
            default: false,
        },
        query: {
            type: Object,
            default: () => ({}),
        },
    },
    data: () => ({
        item_component: {
            buff: ItemBuff,
            skill: ItemSkill,
            npc: ItemNpc,
            doodad: ItemDoodad,
        },

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
    }),
    computed: {
        ...mapState({
            client: (state) => state.database_client,
        }),
        type: {
            get() {
                return this.$store.state.database_type;
            },
            set(val) {
                this.$store.state.database_type = val;
            },
        },
        multiPage() {
            return this.pages > 1;
        },
        hasNextPage() {
            return this.total > 0 && this.page < this.pages;
        },
        isEmpty() {
            return !this.loading && this.query.keyword;
        },
    },
    methods: {
        getList(page = 1, append = false) {
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
                    if (this.data[this.type].length === 1) {
                        this.$emit("toDetail", this.data[this.type][0]);
                    } else {
                        this.$emit("toDetail", "");
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        search() {
            this.page = 1;
            this.getList();
        },
        appendPage() {
            this.page++;
            this.getList(this.page, true);
        },
        changePage(page) {
            this.page = page;
            this.getList(this.page);
        },
        debounceSearch: debounce(function () {
            this.search();
        }, 1000),
    },
    watch: {
        type() {
            this.search();
        },
        client() {
            this.search();
        },
        query: {
            handler: function () {
                this.debounceSearch();
            },
            deep: true,
            immediate: true,
        },
    },
};
</script>

<style lang="scss" scoped></style>
