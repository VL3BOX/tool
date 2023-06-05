<template>
    <div class="p-layout p-layout--app">
        <Header></Header>
        <Breadcrumb :name="title" icon="jx3dat" slug="tool" :root="root" :feedbackEnable="true" :crumbEnable="false">
        </Breadcrumb>
        <LeftSidebar v-if="hasLeft">
            <slot name="left"></slot>
        </LeftSidebar>
        <Main :class="className" :withoutRight="!hasRight">
            <slot></slot>
            <RightSidebar>
                <slot name="right"></slot>
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>

import JX3BOX from "@jx3box/jx3box-common/data/jx3box.json";
import app from "@/assets/data/app.json";

export default {
    name: "AppLayout",
    props: {
        slug: {
            type: String,
            default: "",
        },
        icon: {
            type: String,
            default: "",
        },
        className: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            default: "",
        },
        hasRight: {
            type: Boolean,
            default: true,
        },
        hasLeft: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        root() {
            return `/app/${this.slug}`;
        },
        logo() {
            const key = this.icon || this.slug;
            return JX3BOX.__imgPath + "image/box/" + key + ".svg";
        },
        title() {
            return app[this.slug]?.title || this.name;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>
