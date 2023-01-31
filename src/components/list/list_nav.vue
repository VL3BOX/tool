<!--
 * @Author: iRuxu
 * @Date: 2022-05-05 01:50:05
 * @LastEditTime: 2022-07-22 01:09:50
 * @Description:
-->
<template>
    <div class="m-list-nav">
        <h5 class="u-title"><i class="el-icon-menu"></i> 分类导航</h5>
        <div class="m-nav-group m-tool-nav">
            <router-link
                v-for="(item, i) in menu"
                :to="{ name: 'index', query: { subtype: item.slug } }"
                :key="i"
                :class="{ on: isActive(item) }"
            >
                <i><img :src="getIcon(item.icon)" /></i>
                <div>
                    <b>{{ item.name }}</b>
                    <span>{{ item.desc }}</span>
                </div>
            </router-link>
            <!-- <a href="/app" target="_blank">
                <i class="el-icon-box"></i>
                <b>魔盒应用</b>
                <span>Application</span>
            </a> -->
        </div>

        <div class="m-nav-tags">
            <h5 class="u-title"><i class="el-icon-collection-tag"></i> 热门搜索</h5>
            <div class="u-list">
                <a href="/bps/#/dps" target="_blank">计算器</a>
                <a href="/pz" target="_blank">配装器</a>
                <a href="/bps/#/haste" target="_blank">加速阈值</a>
                <a href="/team" target="_blank">团队排表</a>
                <a href="/battle" target="_blank">战斗复盘</a>
                <a href="/app/servers" target="_blank">开服监控</a>
                <a href="/share/facedata" target="_blank">脸型数据解析</a>
                <a href="https://j3cx.com/exam/" target="_blank">科举题库</a>
                <a href="https://j3cx.com/serendipity" target="_blank">奇遇查询</a>
            </div>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "list_nav",
    props: [],
    data: function () {
        return {
            menu: [
                {
                    slug: "",
                    icon: "el-icon-receiving",
                    name: "全部",
                    desc: "版规与置顶索引",
                    icon: "all",
                },
                {
                    slug: 1,
                    icon: "el-icon-setting",
                    name: "工具资源",
                    desc: "剑三小工具&资源下载",
                    icon: "tool",
                },
                {
                    slug: 3,
                    icon: "el-icon-discover",
                    name: "操作指南",
                    desc: "游戏调优/插件设置与指南",
                    icon: "game",
                },
                {
                    slug: 2,
                    icon: "el-icon-paperclip",
                    name: "技术教程",
                    desc: "竟然在魔盒学编程？！",
                    icon: "code",
                },
                {
                    slug: 4,
                    icon: "el-icon-collection",
                    name: "魔盒文档",
                    desc: "魔盒使用指南&API文档",
                    icon: "api",
                },
            ],
        };
    },
    methods: {
        isActive: function (item) {
            return item.slug == this.$route.query.subtype;
        },
        getIcon: function (slug) {
            return require("../../assets/img/nav/" + slug + ".png");
        },
    },
};
</script>
<style lang="less">
@import "../../assets/css/nav.less";
</style>
