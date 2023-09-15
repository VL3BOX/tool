<template>
    <div class="p-layout p-layout--single">
        <Header></Header>
        <Breadcrumb
            name="教程工具"
            icon="jx3dat"
            slug="tool"
            root="/tool"
            :publishEnable="true"
            :adminEnable="true"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <template #op-prepend>
                <AdminDirectMessage :user-id="user_id" :sourceId="post.ID" :sourceType="post.post_type"></AdminDirectMessage>
            </template>
            <template #title>
                <span>{{ title }}</span>
            </template>
        </Breadcrumb>
        <LeftSidebar :uid="user_id">
            <Nav :id="id" class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <slot></slot>
            <RightSidebar :show-toggle="true">
                <Side :id="id" class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/single/single_nav.vue";
import Side from "@/components/single/single_side.vue";
import { getAppIcon, getAppID } from "@jx3box/jx3box-common/js/utils";
import AdminDirectMessage from "@jx3box/jx3box-common-ui/src/bread/AdminDirectMessage.vue"
export default {
    name: "SingleLayout",
    props: {
        appName: {
            type: String,
            default: "教程工具",
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
            id: getAppID(),
        };
    },
    computed: {
        user_id: function () {
            return this.$store.state.user_id;
        },
        post: function (){
            return this.$store.state.post;
        },
        title() {
            return this.post.post_title || document.title;
        }
    },
    methods: {},
    components: {
        Nav,
        Side,
        AdminDirectMessage
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
