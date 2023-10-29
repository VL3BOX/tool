<template>
    <div class="m-database-list" v-loading="loading">
        <!-- Type切换选项卡 -->
        <database-tabs :client="client" :type.sync="type" :hasRight="hasRight"></database-tabs>
        <el-tabs v-model="defaultSortBy" v-if="!isSearch">
            <el-tab-pane label="最新数据" name="newest"></el-tab-pane>
            <el-tab-pane label="引用指数" name="refCount"></el-tab-pane>
        </el-tabs>
        <!-- 列表区域 -->
        <div class="m-list" v-if="data[type].length">
            <component
                v-for="(item, index) in data[type]"
                :key="`${type}_${index}`"
                :is="item_component[type]"
                :hasRight="hasRight"
                :type="type"
                :data="item"
                :ref-count="getRefCount(item)"
                class="m-list-item"
                @click.native="$emit('toDetail', item)"
            ></component>
            <!-- 分页 -->
            <template v-if="multiPage">
                <el-button
                    v-if="hasNextPage"
                    class="m-more"
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

import { getResource, getNewest, _getResource } from "@/service/node";
import { getRefCount } from "@/service/cms";

import lodash from "lodash";
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
        defaultSortBy: "newest",
        loading: true,

        per: 10,
        page: 1,
        total: 0,
        pages: 0,
    }),
    computed: {
        ...mapState({
            client: (state) => state.database_client,
            refCounts: (state) => state.database_ref_count,
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
        isSearch() {
            return this.query.keyword;
        },
        trigger() {
            return [this.defaultSortBy, this.type, this.client, this.query];
        },
    },
    methods: {
        async getList(page = 1, append = false) {
            const params = {
                strict: this.query.strict,
                per: this.per,
                client: this.client,
                page: page,
            };

            if (this.type === "npc" && this.query.map) params.map = this.query.map;
            if (this.query.level) params.level = this.query.level;
            this.loading = true;
            if (this.isSearch) {
                const mode = isNaN(this.query.keyword) ? "name" : "id";
                getResource(this.type, mode, this.query.keyword, params)
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
                        if (append) this.data[this.type] = this.data[this.type].concat(list);
                        else this.data[this.type] = list;

                        this.getRefCountList();
                        if (this.data[this.type].length === 1) {
                            this.$emit("toDetail", this.data[this.type][0]);
                        } else {
                            this.$emit("toDetail", "");
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else if (this.defaultSortBy === "newest") {
                getNewest(this.type, params)
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
                        this.getRefCountList();
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else if (this.defaultSortBy === "refCount") {
                // 按照指数排序
                const ref_res = await getRefCount({
                    per: this.per,
                    page: page,
                    type: this.type,
                    client: this.client,
                });
                const refs = ref_res.data.data.list;
                this.refCounts[this.type].push(
                    ...refs.filter(
                        (item) => !this.refCounts[this.type].some((i) => JSON.stringify(i) === JSON.stringify(item))
                    )
                );
                // 取出id去请求node
                const ids = refs.map((item) => {
                    const { source_id: id, source_level: level } = item;
                    return level ? `${id}_${level}` : `${id}`;
                });
                const resource_res = await _getResource(this.client, this.type, { ids }).finally(() => {
                    this.loading = false;
                });
                const data = resource_res.data;

                if (append) {
                    this.data[this.type].push(...data);
                } else {
                    this.data[this.type] = data;
                }
            }
        },
        getRefCountList() {
            const ids = lodash.uniq(
                this.data[this.type]
                    .filter((item) => this.getRefCount(item) === null)
                    .map((item) => {
                        const id = item.ID || item.BuffID || item.SkillID;
                        return `${this.type}_${id}`;
                    })
            );
            if (!ids.length) return;
            getRefCount({ ids: ids.join(",") }).then((res) => {
                const refs = res.data.data.list;
                this.refCounts[this.type].push(
                    ...refs.filter(
                        (item) => !this.refCounts[this.type].some((i) => JSON.stringify(i) === JSON.stringify(item))
                    )
                );
            });
        },
        getRefCount(item) {
            const id = item.ID || item.BuffID || item.SkillID;
            const level = item.Level;
            let ref = this.refCounts[this.type].find(
                (item) =>
                    item.type === this.type &&
                    item.source_id === id &&
                    (["doodad", "npc"].includes(this.type) || item.source_level === level)
            );
            if (!ref && level == 0)
                ref = this.refCounts[this.type].find((item) => item.type === this.type && item.source_id === id);
            return ref ? ref.count : null;
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
    },
    watch: {
        trigger: {
            immediate: true,
            deep: true,
            handler: lodash.throttle(function () {
                this.search();
            }, 500),
        },
    },
};
</script>

<style lang="scss" scoped></style>
