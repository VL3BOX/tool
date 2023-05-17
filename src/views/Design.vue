<template>
    <AppLayout slug="design" icon="icons" name="设计资源" :hasRight="false">
        <template #left>
            <Nav></Nav>
        </template>
        <div class="m-archive-box">
            <router-view></router-view>
        </div>
    </AppLayout>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import Nav from "@/components/design/nav.vue"
export default {
    name: "Design",
    components: {
        AppLayout,
        Nav
    },
    data() {
        return {}
    },
    computed: {

    },
    methods: {

    },
    mounted() {
        document.title = "设计资源 - JX3BOX";
    },
};
</script>

<style lang="less">
@import "~@/assets/css/design/design.less";
.m-archive-box {
    padding:20px 25px;
}
</style>
