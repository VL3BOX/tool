<template>
    <div class="p-layout p-layout--list">
        <Header></Header>
        <Breadcrumb
            :name="appName"
            icon="jx3dat"
            :slug="appKey"
            :root="`/${appKey}`"
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
        <Main :withoutRight="withoutRight">
            <div class="m-main">
                <slot></slot>
            </div>
            <RightSidebar>
                <component :is="metaType" class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/list/Info.vue";
import Nav from "@/components/list/list_nav.vue";
import Side from "@/components/list/list_side.vue";
import PluginSide from "@/components/list/plugin_list_side.vue";
export default {
    name: "App",
    props: {
        appName: {
            type: String,
            default: "工具资源",
        },
        appKey: {
            type: String,
            default: "tool",
        },
        withoutRight: {
            type: Boolean,
            default: false,
        },
    },
    data: function () {
        return {
        };
    },
    computed: {
        metaType() {
            return {
                tool: 'Side',
                jx3dat: 'PluginSide',
            }[this.$route.meta.type];
        }
    },
    methods: {},
    components: {
        Info,
        Nav,
        Side,
        PluginSide,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
