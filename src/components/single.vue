<template>
    <singlebox :post="post" :author="author" :stat="stat" v-loading="loading">
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">类型</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>
        <!-- 警告 -->
        <el-alert
            v-if="isTool"
            class="m-single-notice"
            title="特别说明"
            type="warning"
            description="请严格保护个人财产安全，勿轻信任何收费服务，本站不对作者提供的下载资源做任何担保，凡是不受官方认可、或疑似外挂，以及不符合站内创作公约及发布规范的作品予以删除处理，欢迎广大玩家监督与举报。"
            show-icon
        >
        </el-alert>
        <Thx class="m-thx" slot="single-append" :postId="id" postType="tool" :userId="author_id" :adminBoxcoinEnable="true" :userBoxcoinEnable="true"/>
    </singlebox>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "../service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import _ from "lodash";
const types = {
    "1" : "工具源码",
    "2" : "资源分享",
    "3" : "插件指南",
    "4" : "帮助文档"
}

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,
            post: {},
            author: {},
            stat: {},
        };
    },
    computed: {
        id: function() {
            return this.$store.state.id;
        },
        post_subtype: function() {
            let subtype = _.get(this.post, "post_subtype")
            if(subtype){
                return types[subtype]
            }else{
                return '-'
            }
        },
        isTool : function (){
            return this.post.post_subtype == '1'
        },
        author_id : function (){
            return this.post?.post_author || 0
        }
    },
    methods: {
    },
    filters: {},
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data;
                    this.$store.state.user_id = this.post.post_author;
                    document.title = this.post.post_title
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat('tool',this.id).then((res) => {
                this.stat = this.$store.state.stat = res.data;
            });
            postStat('tool',this.id);
        }
    },
    components : {
        singlebox,
    }
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
