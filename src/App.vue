<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="教程工具" slug="tool" root="/tool" :publishEnable="true" :adminEnable="false" :feedbackEnable="true" :crumbEnable="true">
            <img slot="logo" svg-inline src="./assets/img/tool.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="true">
            <router-view class="m-main" />
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/list/Info.vue";
import Nav from "@/components/list/list_nav.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: { getAppIcon },
    components: {
        Nav,
        Info,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
