<!--
 * @Author: iRuxu
 * @Date: 2022-05-05 01:50:05
 * @LastEditTime: 2022-07-22 01:09:50
 * @Description:
-->
<template>
    <div class="m-list-nav">
        <!-- 群号 -->
        <!-- <RightSideMsg>
            <em>工具作者交流群</em> :
            <strong @click="onQQClick" class="u-link" title="点击复制">
                <a>{{ qq }}</a>
            </strong>
        </RightSideMsg> -->

        <!-- <h5 class="u-title"><i class="el-icon-menu"></i> 分类导航</h5> -->
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

        <div class="m-tool-side">
            <el-collapse>
                <el-collapse-item title="💠 版规与要求" name="rule" class="m-tool-rule">
                    <div class="u-content" v-html="rules"></div>
                </el-collapse-item>
                <el-collapse-item title="🌀 魔盒API文档索引" name="api" class="m-tool-api">
                    <div class="u-list" v-if="apis && apis.length">
                        <a
                            class="u-item"
                            v-for="(item, i) in apis"
                            :href="item.link"
                            target="_blank"
                            :style="highLight(item.color)"
                            :key="i"
                        >
                            <i :class="item.icon"></i> {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="🌸 热门搜索" name="tags" class="m-tool-rule">
                    <div class="m-nav-tags" v-if="tags && tags.length">
                        <!-- <h5 class="u-title"><i class="el-icon-collection-tag"></i> 热门搜索</h5> -->
                        <div class="u-list">
                            <a :href="item.link" target="_blank" v-for="(item, i) in tags" :key="i">{{ item.label }}</a>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { jx3dat_types } from "@/assets/data/types.json";
import { getMenuGroup, getBread } from "@/service/helper.js";
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
                    name: "工具资源",
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
            tags: [],
            rules: "",
            apis: [],

            qq: "608303480",
        };
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler(val) {
                if (!val?.query?.subtype && val.name != "jx3dat") {
                    this.$router
                        .replace({
                            name: val.name,
                            query: { subtype: "" },
                        })
                        .catch(() => {});
                }
            },
        },
    },
    mounted() {
        this.loadTags();
        this.loadRules();
        this.loadApis();
    },
    methods: {
        isActive: function (item, routeName) {
            return item.slug == this.$route.query.subtype && this.$route.name == routeName;
        },
        getIcon: function (slug, type = ".png") {
            return require("../../assets/img/nav/" + slug + type);
        },
        loadTags() {
            getMenuGroup("tool_links").then((res) => {
                this.tags = res.data.data?.menus || [];
            });
        },
        onQQClick() {
            navigator.clipboard.writeText(this.qq).then(() => {
                this.$notify({
                    title: "复制成功",
                    message: "内容：" + this.qq,
                    type: "success",
                });
            });
        },
        loadRules: function () {
            getBread("tool_rule").then((res) => {
                this.rules = res.data.data.html;
            });
        },
        loadApis: function () {
            getMenuGroup("tool_api").then((res) => {
                this.apis = res.data.data.menus || [];
            });
        },
        highLight: function (val) {
            if (val) {
                return "color:" + val + ";font-weight:bold;";
            }
            return "";
        },
    },
};
</script>
<style lang="less">
@import "../../assets/css/nav.less";
</style>
