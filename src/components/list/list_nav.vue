<!--
 * @Author: iRuxu
 * @Date: 2022-05-05 01:50:05
 * @LastEditTime: 2022-07-22 01:09:50
 * @Description:
-->
<template>
    <div class="m-list-nav">
        <!-- <h5 class="u-title"><i class="el-icon-menu"></i> 工具资源</h5> -->
        <div class="m-nav-group">
            <router-link
                v-for="(item, i) in menu"
                :to="{ name: item.routeName, query: { subtype: item.slug } }"
                :key="i"
                :class="{ on: isActive(item, item.routeName) }"
                class="u-item"
            >
                <img :src="getIcon(item.icon)" />
                <span class="u-text">{{ item.name }}</span>
            </router-link>
            <!-- <router-link to="/userdata" class="u-item disabled">
                <img src="@/assets/img/nav/userdata.svg" />
                <span class="u-text">用户配置数据</span>
            </router-link> -->
        </div>

        <!-- <h5 class="u-title">插件数据</h5>
        <div class="m-nav-group">
            <router-link
                v-for="(label, key) in jx3dat_types"
                :key="label"
                :to="{ name: 'plugins', query: { subtype: key } }"
                :class="{ on: isActive(key, 'plugins') }"
                class="u-item"
            >
                <img :src="getIcon(key, '.svg')" />
                <span class="u-text">{{ label }}</span>
            </router-link>
        </div> -->

        <div class="m-nav-tags">
            <h5 class="u-title"><i class="el-icon-collection-tag"></i> 热门搜索</h5>
            <div class="u-list">
                <a href="/bps/#/dps" target="_blank">计算器</a>
                <a href="/pz" target="_blank">配装器</a>
                <a href="/bps/#/haste" target="_blank">加速阈值</a>
                <a href="/team" target="_blank">团队排表</a>
                <a href="/battle" target="_blank">战斗复盘</a>
                <a href="/pvg/gonggao/server" target="_blank">开服监控</a>
                <a href="/face/facedata" target="_blank">脸型数据解析</a>
                <a href="https://j3cx.com/exam/" target="_blank">科举题库</a>
                <a href="https://j3cx.com/serendipity" target="_blank">奇遇查询</a>
            </div>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { jx3dat_types } from "@/assets/data/types.json";
export default {
    name: "list_nav",
    props: [],
    data: function () {
        return {
            menu: [
                {
                    slug: "",
                    name: "全部资源",
                    desc: "剑三小工具&资源下载",
                    icon: "all",
                    type: "tool",
                    routeName: "index",
                    disabled: false,
                },
                {
                    slug: 1,
                    name: "工具助手",
                    desc: "剑三小工具&资源下载",
                    icon: "tool",
                    type: "tool",
                    routeName: "index",
                    disabled: false,
                },
                {
                    slug: "",
                    name: "插件数据",
                    desc: "剑三插件数据",
                    icon: "data",
                    type: "jx3dat",
                    routeName: "jx3dat",
                    disabled: false,
                },
                {
                    slug: 3,
                    name: "教程指南",
                    desc: "游戏调优/插件设置与指南",
                    icon: "game",
                    type: "tool",
                    routeName: "index",
                    disabled: false,
                },
                {
                    slug: 4,
                    name: "魔盒文档",
                    desc: "魔盒使用指南&API文档",
                    icon: "api",
                    type: "tool",
                    routeName: "index",
                    disabled: false,
                },
            ],

            jx3dat_types,
        };
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler(val) {
                if (!val?.query?.subtype && val.name != "jx3dat") {
                    this.$router.replace({
                        name: val.name,
                        query: { subtype: "" },
                    }).catch(() => {});
                }
            }
        }
    },
    methods: {
        isActive: function (item, routeName) {
            return item.slug == this.$route.query.subtype && this.$route.name == routeName;
        },
        getIcon: function (slug, type=".png") {
            return require("../../assets/img/nav/" + slug + type);
        },
    },
};
</script>
<style lang="less">
@import "../../assets/css/nav.less";
</style>
