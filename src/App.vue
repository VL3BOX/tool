<!--
 * @Author: iRuxu
 * @Date: 2022-05-05 01:50:05
 * @LastEditTime: 2022-07-22 00:26:17
 * @Description:
-->
<template>
    <div id="app">
        <router-view class="m-main" />
        <!-- <Header></Header>
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
        </Main> -->
    </div>
</template>

<script>
export default {
    name: "App",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
