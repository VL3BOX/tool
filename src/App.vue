<!--
 * @Author: iRuxu
 * @Date: 2022-05-05 01:50:05
 * @LastEditTime: 2022-07-22 00:26:17
 * @Description:
-->
<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="教程工具" slug="tool" root="/tool" :publishEnable="true" :adminEnable="false" :feedbackEnable="true" :crumbEnable="true">
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <router-view class="m-main" />
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/list/Info.vue";
import Nav from "@/components/list/list_nav.vue";
import Side from "@/components/list/list_side.vue";
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
        Side,
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
