<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="教程工具" slug="tool" root="/tool" :publishEnable="true" :adminEnable="false" :feedbackEnable="true" :crumbEnable="true">
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
export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    components: {
        Nav,
        Info,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
