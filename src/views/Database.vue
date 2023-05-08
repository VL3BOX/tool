<template>
    <div>
        <app-layout slug="database" icon="database">
            <template #left>
                <database-filter :type="type" :client.sync="client"></database-filter>
                <app-nav></app-nav>
            </template>
            <div class="v-database">
                <database-tabs :client="client" :type.sync="type"></database-tabs>
                <div class="m-list">
                    <div v-if="data.length"></div>
                    <div v-else class="m-empty">❤ 请在左侧选择筛选条件</div>
                </div>
            </div>
            <template #right>
                <database-versions></database-versions>
                <database-star></database-star>
            </template>
        </app-layout>
    </div>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import AppNav from "@/components/app_nav.vue";
import DatabaseFilter from "@/components/database/filter.vue";
import DatabaseTabs from "@/components/database/tabs.vue";
import DatabaseStar from "@/components/database/star.vue";
import DatabaseVersions from "@/components/database/versions.vue";

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
        type: "buff",
        client: "std",
        data: [],
    }),
    mounted() {},
    methods: {},
};
</script>

<style lang="less">
@import "~@/assets/css/database.less";
</style>
