<template>
    <singlebox :post="post" :stat="stat" v-loading="loading" @extendUpdate="updateExtend">
        <!-- 头部子类型 -->
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">类型</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>

        <!-- 文首警告 -->
        <el-alert
            v-if="isTool"
            class="m-single-notice"
            title="特别说明"
            type="warning"
            description="请严格保护个人财产安全，勿轻信任何收费服务，本站不对作者提供的下载资源做任何担保，凡是不受官方认可、或疑似外挂，以及不符合站内创作公约及发布规范的作品予以删除处理，欢迎广大玩家监督与举报。"
            show-icon
        >
        </el-alert>
    </singlebox>
</template>

<script>
// 依赖模块
import singlebox from "@/components/cms-single";

// 本地数据
import { getPost } from "../../service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import types from "@/assets/data/tool_types.json";
import { appKey } from "../../../setting.json";
import { getAppIcon, getAppID } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "single",
    data: function() {
        return {
            loading: false,
            post: {},
            stat: {},
            id: getAppID(),
        };
    },
    computed: {
        post_subtype: function() {
            let subtype = this.post?.post_subtype;
            return subtype ? types[subtype] : "-";
        },
        isTool: function() {
            return this.post?.post_subtype == "1";
        },
    },
    methods : {
        updateExtend : function (val){
            this.$store.state.extend = val
        }
    },
    mounted: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id)
                .then((res) => {

                    this.post = this.$store.state.post = res.data.data;
                    this.$store.state.id = this.id;
                    this.$store.state.user_id = this.post?.post_author;

                    document.title = this.post.post_title;
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat(appKey, this.id).then((res) => {
                this.stat = this.$store.state.stat = res.data;
            });
            postStat(appKey, this.id);
        }
    },
    components: {
        singlebox,
    },
};
</script>

<style lang="less">
@import "../../assets/css/single.less";
</style>
