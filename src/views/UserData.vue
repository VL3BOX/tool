<template>
    <ListLayout app-key="jx3dat" :app-name="$t('数据下载')" :without-right="true">
        <div class="m-userdata">
            <div class="m-plugins-header">
                <h1 class="m-plugins-title"><i class="el-icon-user"></i>{{ $t('用户配置数据') }}</h1>
            </div>
            <div>{{ $t('即将登陆...') }}</div>
        </div>
    </ListLayout>
</template>

<script>
import ListLayout from "@/layouts/ListLayout.vue";
export default {
    name: "Userdata",
    props: [],
    components: {
        ListLayout,
    },
    data: function () {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "~@/assets/css/userdata.less";
</style>
