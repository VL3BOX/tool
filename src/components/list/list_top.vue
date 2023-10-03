<template>
    <div class="m-bbs-top">
        <div class="m-bbs-top__header">
            <h3 class="u-title"><i class="el-icon-news"></i>公告</h3>
            <!-- <a href="/notice" class="u-more" target="_blank">全部 &raquo;</a> -->
        </div>
        <div class="m-bbs-top__content">
            <div class="m-bbs-top__item" v-for="item in data" :key="item.id">
                <div class="m-item_left">
                    <a class="u-title">{{
                        item
                    }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBreadcrumb } from "@jx3box/jx3box-common/js/api_misc";
export default {
    data() {
        return {
            data: [],
        };
    },
    mounted() {
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb() {
            getBreadcrumb('tool_ac').then(res => {
                this.data = res.split('\n');
            })
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list_top.less";
</style>
