<template>
    <div class="m-single-meta m-tool-meta" v-if="hasFile">
        <div class="m-single-meta__main">
            <div class="m-meta-item" v-for="item in data" :key="item.name">
                <template v-if="item.mode == 1">
                    <span class="u-name"><i class="el-icon-box"></i>{{ item.name || "暂无资源" }}</span>
                    <span class="u-remark">{{ item.remark || "" }}</span>
                    <a
                        class="u-download-btn el-button el-button--primary el-button--small"
                        :href="item.file"
                        target="_blank"
                        v-show="item.file"
                    >
                        <i class="el-icon-download"></i>
                        <span>本地下载</span>
                    </a>
                </template>
                <template v-if="item.mode == 0">
                    <span class="u-name"><i class="el-icon-box"></i>{{ item.name || "暂无资源" }}</span>
                    <span class="u-remark">{{ item.remark || "" }}</span>
                    <a
                        class="u-download-btn el-button el-button--primary el-button--small"
                        :href="item.file"
                        target="_blank"
                        v-show="item.file"
                    >
                        <i class="el-icon-link"></i>
                        <span>前往下载</span>
                    </a>
                </template>
            </div>
        </div>
        <div class="m-single-meta__side">
            <!-- 文首警告 -->
            <div class="m-single-notice">
                <div class="m-notice-header">
                    <i class="el-icon-warning"></i>
                    <span class="u-header">特别说明</span>
                    <a class="u-report" :href="feedback" target="_blank">快捷举报</a>
                </div>
                <div class="m-description">
                    <div class="m-content">
                        <div class="m-description-item" v-for="(item, i) in content" :key="i">
                            <span class="u-number">{{ i + 1 }}.</span>
                            <span class="u-text">{{ item }}</span>
                        </div>
                    </div>
                    <img class="u-description-bg" src="@/assets/img/single/box_deyi.svg" alt="">
                </div>
            </div>
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
    data: function () {
        return {
            feedback: "/feedback?refer=" + encodeURIComponent(window.location.href),
            content: [
                "请严格保护个人财产安全，勿轻信任何收费服务。",
                "本站不对作者提供的下载资源做任何担保。",
                "凡是不受官方认可、或疑似外挂，以及不符合站内创作公约及发布规范的作品予以删除处理。",
                "欢迎广大玩家监督与举报。",
            ]
        };
    },
    computed: {
        isTool: function () {
            return this.post?.post_subtype == "1";
        },
        data() {
            return this.post?.post_meta?.data || [];
        },
        hasFile(){
            return this.post.post_subtype == '1' || this.post.post_subtype == '2'
        }
    },
    methods: {},
};
</script>
