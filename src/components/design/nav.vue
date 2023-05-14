<template>
    <div class="m-list-nav">
        <div class="m-nav-group">
            <router-link
                v-for="(item, i) in menu"
                :to="{ name: item.routeName }"
                :key="i"
                :class="{ on: isActive(item) }"
                class="u-item"
            >
                <!-- <img :src="getIcon(item.icon)" /> -->
                <span class="u-text">{{ item.name }}</span>
            </router-link>
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
                    icon: "el-icon-setting",
                    name: "表情包",
                    desc: "剑三表情包",
                    routeName: "emotion"
                },
                {
                    icon: "el-icon-setting",
                    name: "矢量图标库",
                    desc: "图标库",
                    routeName: "icon"
                },
                // {
                //     icon: "el-icon-setting",
                //     name: "魔盒图标字体库",
                //     desc: "字体库",
                //     routeName: "emotion"
                // },
                {
                    icon: "el-icon-setting",
                    name: "魔盒壁纸库",
                    desc: "壁纸库",
                    routeName: "wallpaper"
                },
            ],
        };
    },
    methods: {
        isActive: function (item, routeName) {
            return item.routeName == this.$route.name;
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
