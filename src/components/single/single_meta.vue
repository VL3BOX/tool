<template>
    <div class="m-single-meta m-tool-meta">
        <div class="m-single-meta__main">
            <div class="m-meta-item" v-for="(item) in data" :key="item.name">
                <template v-if="item.mode ==1">
                    <span class="u-name"><i class="el-icon-files"></i>{{ item.name }}</span>
                    <span class="u-remark">{{ item.remark || '' }}</span>
                    <a
                        class="el-button el-button--default el-button--small is-plain"
                        :href="item.file"
                        target="_blank"
                    >
                        <i class="el-icon-download"></i>
                        <span>本地下载</span>
                    </a>
                </template>
                <template v-if="item.mode ==0">
                    <span class="u-name"><i class="el-icon-link"></i>{{ item.name }}</span>
                    <span class="u-remark">{{ item.remark || '' }}</span>
                    <a
                        class="el-button el-button--default el-button--small is-plain"
                        :href="item.file"
                        target="_blank"
                    >
                        <i class="el-icon-link"></i>
                        <span>前往下载</span>
                    </a>
                </template>
            </div>
        </div>
        <div class="m-single-meta__side">
            <!-- 文首警告 -->
            <el-alert
                v-if="isTool"
                class="m-single-notice"
                title="特别说明"
                type="warning"
                description="请严格保护个人财产安全，勿轻信任何收费服务，本站不对作者提供的下载资源做任何担保，凡是不受官方认可、或疑似外挂，以及不符合站内创作公约及发布规范的作品予以删除处理，欢迎广大玩家监督与举报。"
                show-icon
                :closable="false"
            >
            </el-alert>
            <el-button class="u-report" type="primary">快捷举报</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "single_meta",
    props: {
        post: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        isTool: function () {
            return this.post?.post_subtype == "1";
        },
        data() {
            return this.post?.post_meta?.data || [];
        },
    },
};
</script>
