<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb
            name="教程工具"
            slug="tool"
            root="/tool"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/tool.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="true">
            <list class="m-main" />
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import list from "@/components/list.vue";
import Info from "@/components/Info.vue";
import Nav from "@/components/list_nav.vue";
import Side from "@/components/list_side.vue";
import { getQuery } from "@jx3box/jx3box-common/js/utils";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {getAppIcon},
    components: {
        Nav,
        list,
        Side,
        Info
    },
    beforeCreate: function () {
        // this.$store.state.subtype = getQuery("subtype");
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
@media screen and (max-width: @phone) {
    .c-crumb{
        .none;
    }
    .c-breadcrumb{
        .u-op{
            .none;
        }
    }
}
</style>
