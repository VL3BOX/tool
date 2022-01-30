<template>
    <div class="m-list-nav">
        <RightSideMsg>
            <em>工具作者交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=t1uvYnW1">297985102</a>
            </strong>
        </RightSideMsg>

        <h5 class="u-title"><i class="el-icon-menu"></i> 分类导航</h5>
        <div class="m-nav-group m-tool-nav">
            <router-link v-for="(item, i) in menu" :to="{ name: 'index', query: { subtype: item.slug } }" :key="i" :class="{on:isActive(item)}">
                <i :class="item.icon"></i>
                <b>{{ item.name }}</b>
                <span>{{ item.desc }}</span>
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
                <router-link to="/?search=计算器">计算器</router-link>
                <a href="/pz" target="_blank">配装器</a>
                <a href="/team" target="_blank">团队排表</a>
                <a href="/battle" target="_blank">战斗复盘</a>
                <a href="/app/servers" target="_blank">开服监控</a>
                <a href="/pvx/facedata" target="_blank">脸型数据解析</a>
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
    data: function() {
        return {
            menu: [
                {
                    slug: "",
                    icon: "el-icon-receiving",
                    name: "全部",
                    desc: "All",
                },
                {
                    slug: 1,
                    icon: "el-icon-setting",
                    name: "剑三工具",
                    desc: "Tool",
                },
                {
                    slug: 3,
                    icon: "el-icon-discover",
                    name: "游戏指南",
                    desc: "Usage",
                },
                {
                    slug: 2,
                    icon: "el-icon-paperclip",
                    name: "其它资源",
                    desc: "Resource",
                },
                {
                    slug: 4,
                    icon: "el-icon-collection",
                    name: "魔盒文档",
                    desc: "Help",
                },
            ],
        };
    },
    methods : {
        isActive : function (item){
            return item.slug == this.$route.query.subtype
        }
    }
};
</script>
<style lang="less">
@import "../../assets/css/nav.less";
</style>
