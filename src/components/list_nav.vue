<template>
    <div class="m-list-nav">
        <RightSideMsg>
            <em>工具作者交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=t1uvYnW1">297985102</a>
            </strong>
        </RightSideMsg>

        <h5 class="u-title">分类导航</h5>
        <div class="m-nav-group m-tool-nav">
            <!-- <a
                v-for="(item, i) in menu"
                :href="typeLink(item.slug)"
                :key="i"
                :class="{ on: item.slug == subtype }"
            >
                <i :class="item.icon"></i>
                <b>{{ item.name }}</b>
                <span>{{ item.desc }}</span>
            </a> -->
            <router-link
                v-for="(item,i) in menu"
                :to="typeLink(item.slug)"
                :key="i"
                :class="{on:isActive(item.slug)}"
            >
                <i :class="item.icon"></i>
                <b>{{item.name}}</b>
                <span>{{item.desc}}</span>
            </router-link>
        </div>

        <h5 class="u-title">魔盒应用</h5>
        <div class="m-app-box">
            <a class="u-app" href="/app/database" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('database')" />
                </i>
                <span>数据库</span>
            </a>
            <a class="u-app" href="/app/icons" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('icons')" />
                </i>
                <span>图标库</span>
            </a>
            <a class="u-app" href="/j3pz" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('j3pz')" />
                </i>
                <span>在线配装</span>
            </a>

            <a class="u-app" href="/app/talent" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('talent')" />
                </i>
                <span>奇穴模拟</span>
            </a>
            <a class="u-app" href="/app/talent2" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('talent2')" />
                </i>
                <span>镇派模拟</span>
            </a>
            <a class="u-app" href="/app/meridians" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('meridians')" />
                </i>
                <span>经脉模拟</span>
            </a>

            <a class="u-app" href="/team" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('team')" />
                </i>
                <span>团队管理</span>
            </a>
            <a class="u-app" href="/dbm" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('dbm')" />
                </i>
                <span>数据构建</span>
            </a>
            <a class="u-app" href="/battle" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('battle')" />
                </i>
                <span>战斗分析</span>
            </a>

            
            <a class="u-app" href="/app/servers" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('servers')" />
                </i>
                <span>开服监控</span>
            </a>
            <a class="u-app" href="/app/price" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('price')" />
                </i>
                <span>金价走势</span>
            </a>
            <a class="u-app" href="/app/sandbox" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('sandbox')" />
                </i>
                <span>阵营沙盘</span>
            </a>

            <a class="u-app" href="/app/macroeditor" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('macroeditor')" />
                </i>
                <span>宏编辑器</span>
            </a>
            <a class="u-app" href="/app/translator" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('translator')" />
                </i>
                <span>繁體轉換</span>
            </a>
            <a class="u-app" href="/app/facedata" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('facedata')" />
                </i>
                <span>妆容解析</span>
            </a>

            <a class="u-app" href="https://j3cx.com/serendipity" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('qiyu')" />
                </i>
                <span>奇遇查询</span>
            </a>
            <a class="u-app" href="https://j3cx.com/exam/" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('keju')" />
                </i>
                <span>科举题库</span>
            </a>
            <a class="u-app" href="/app" target="_blank">
                <i class="u-app-icon">
                    <img :src="getIcon('home')" />
                </i>
                <span>全部</span>
            </a>
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
                    desc: "All",
                },
                {
                    slug: 1,
                    icon: "el-icon-setting",
                    name: "剑三工具",
                    desc: "Tool",
                },
                {
                    slug: 2,
                    icon: "el-icon-paperclip",
                    name: "其它资源",
                    desc: "Resource",
                },
                {
                    slug: 3,
                    icon: "el-icon-collection",
                    name: "游戏指南",
                    desc: "Usage",
                },
                // {
                //     slug: 5,
                //     icon: "el-icon-attract",
                //     name: "插件下载",
                //     desc: "Plugins",
                // },
                {
                    slug: 4,
                    icon: "el-icon-warning-outline",
                    name: "魔盒文档",
                    desc: "Help",
                },
            ],
        };
    },
    computed: {
        subtype: function () {
            return this.$route.query.subtype || "";
        },
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        typeLink: function (subtype) {
            return "./?subtype=" + subtype;
        },
        getIcon: function (key) {
            return __imgPath + "image/box/" + key + ".svg";
        },
        isActive: function (slug) {
            return this.$route.name == "index" && slug == this.subtype;
        },
    },
    mounted: function () {
        // console.log(this.$store.state.subtype)
    },
    components: {},
};
</script>
<style lang="less">
@import "../assets/css/nav.less";
</style>