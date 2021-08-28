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
        <div class="u-collection" v-if="collectionList && collectionList.length">
            <div class="u-collection-title" @click="handleShow" :class="{ on: showCollection }">
                <span><i class="el-icon-notebook-1"></i> 该作品已被收录至作者的剑三小册</span>
                <a @click.stop :href="collectionInfo.id | getLink">《{{ collapseTitle }}》</a>
            </div>
            <transition name="fade">
                <div v-if="showCollection">
                    <ol
                        v-if="collectionList && collectionList.length"
                        class="u-list u-collection-content"
                        :style="{ display: showCollection ? 'block' : 'none' }"
                    >
                        <li v-for="(item, i) in collectionList" :key="i" class="u-item">
                            <a v-if="item" :href="item | showLink" target="_blank">
                                <i class="el-icon-link"></i>
                                {{ item.title }}
                            </a>
                        </li>
                    </ol>
                </div>
            </transition>
        </div>
        <Thx class="m-thx" slot="single-append" :postId="id" postType="tool" :userId="author_id" :adminBoxcoinEnable="true" :userBoxcoinEnable="true"/>
    </singlebox>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "../service/post.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import { getLink } from "@jx3box/jx3box-common/js/utils.js"
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

            showCollection: false,
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
        },
        collectionInfo: function (){
            return this.$store.state.collectionInfo;
        },
        collapseTitle: function (){
            return this.collectionInfo?.title
        },
        collectionList: function (){
            return this.collectionInfo?.posts
        }
    },
    methods: {
        handleShow: function (){
            this.showCollection = !this.showCollection;
        },
    },
    filters: {
        getLink: function (id){
            return getLink('collection', id);
        },
        showLink: function (item) {
            if (item.type == "custom") {
                return item.url;
            } else {
                return getLink(item.type, item.id);
            }
        },
    },
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
