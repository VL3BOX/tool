<template>
    <div>
        <Header></Header>
        <Breadcrumb
            name="教程工具"
            slug="tool"
            root="/tool"
            :publishEnable="true"
            :adminEnable="false"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <slot></slot>
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
    props: {
        appName: {
            type: String,
            default: "教程工具",
        },
        appKey: {
            type: String,
            default: "tool",
        },
    },
    data: function () {
        return {};
    },
    methods: {},
    components: {
        Info,
        Nav,
        Side,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
