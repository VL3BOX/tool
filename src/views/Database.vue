<template>
    <app-layout slug="database" icon="database">
        <template #left>
            <!-- 筛选区域 -->
            <database-filter :type="type" :client.sync="client" :query.sync="query"></database-filter>
            <!-- 其他应用跳转区域 -->
            <app-nav></app-nav>
        </template>
        <div class="v-database">
            <keep-alive :exclude="['DatabaseDetail']">
                <database-detail
                    v-if="current"
                    :hasRight="hasRight"
                    :type="type"
                    :data.sync="current"
                    :ref-count="getRefCount(current)"
                ></database-detail>
                <database-list v-else :hasRight="hasRight" :query="query" @toDetail="toDetail"></database-list>
            </keep-alive>
            <!-- <Bottom></Bottom> -->
        </div>
        <template #right>
            <!-- 数据库版本信息 -->
            <database-versions :client="client"></database-versions>
            <!-- 收藏数据 -->
            <database-star v-if="isLogin" :type="type" :client="client" @toDetail="toDetail"></database-star>
        </template>
    </app-layout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import AppNav from "@/components/app_nav.vue";
import DatabaseFilter from "@/components/database/filter.vue";
import DatabaseStar from "@/components/database/star.vue";
import DatabaseVersions from "@/components/database/versions.vue";
import DatabaseList from "@/components/database/list.vue";
import DatabaseDetail from "@/components/database/detail.vue";

import User from "@jx3box/jx3box-common/js/user";
import { getIsSuperAuthor } from "@/service/post";
import { mapState } from "vuex";

export default {
    name: "Database",
    components: {
        AppLayout,
        AppNav,
        DatabaseFilter,
        DatabaseList,
        DatabaseDetail,
        DatabaseStar,
        DatabaseVersions,
    },
    data: () => ({
        query: {
            keyword: "",
            level: "",
            strict: false,
        },

        hasRight: false,
        current: "",
    }),
    computed: {
        ...mapState({ isLogin: (state) => state.isLogin, refCounts: (state) => state.database_ref_count }),
        client: {
            get() {
                return this.$store.state.database_client;
            },
            set(val) {
                this.$store.state.database_client = val;
            },
        },
        type: {
            get() {
                return this.$store.state.database_type;
            },
            set(val) {
                this.$store.state.database_type = val;
            },
        },
    },
    methods: {
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
        initPermission() {
            User.isLogin() &&
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
            const { query, type, level, client } = this.$route.query;
            if (query) this.query.keyword = query;
            if (type) this.type = type;
            if (level) this.query.level = level;
            if (client) this.$store.state.database_client = client;
        },
        toDetail(item) {
            const query = { ...this.$route.query };

            query.type = this.type;

            const id = item.ID || item.SkillID || item.BuffID;
            query.query = id;

            const level = item.Level;
            if (level) query.level = level;

            this.$router.replace({ query }).catch(() => {});
            this.current = item;
            if (!item) return;

            window.scrollTo(0, 0);
        },
    },
    watch: {
        type() {
            const query = { ...this.$route.query };
            query.type = this.type;
            this.$router.replace({ query }).catch(() => {});
        },
    },
    mounted() {
        this.initPermission();
        this.initQuery();
        this.$store.dispatch("getMapIndex");
        this.$store.dispatch("getDatabaseFields");
        this.$store.dispatch("getDatabaseBlacklist");
        document.title = "剑三数据库 - JX3BOX";
    },
};
</script>

<style lang="less">
@import "~@/assets/css/database.less";
</style>
