<template>
    <div class="m-wallpaper">
        <el-tabs v-model="active" type="card">
            <el-tab-pane v-for="item in wallpaper" :key="item.name" :name="item.name" :label="item.label">
                <div class="m-wallpaper-box">
                    <figure class="m-wallpaper-item" v-for="img in getPreviewImgs(item)" :key="img.name">
                        <el-image :src="getThumbnail(img.url)"></el-image>
                        <figcaption class="u-img-name">{{ img.name }}</figcaption>
                        <div class="u-sizes">
                            <a
                                class="u-size-item"
                                :href="getImgUrl(item.name, size, img.name)"
                                v-for="size in item.sizes"
                                :key="size"
                                target="_blank"
                                title="点击查看原图"
                                >{{ format(size) }}</a
                            >
                        </div>
                    </figure>
                </div>
                <div class="m-wallpaper-author">
                    <b>Designed By :</b>
                    <div class="m-authors" v-if="authors && authors.length">
                        <a
                            class="u-author"
                            target="_blank"
                            :href="authorLink(item.ID)"
                            v-for="(item, i) in authors"
                            :key="i"
                        >
                            <img :src="showAvatar(item.user_avatar)" :alt="item.display_name" />
                            {{ item.display_name }}
                        </a>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import wallpaper from "@/assets/data/design/wallpaper.json";
import { getThumbnail, authorLink, showAvatar } from "@jx3box/jx3box-common/js/utils";
import { getUsers } from "@/service/cms";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
import cloneDeep from "lodash/cloneDeep";
export default {
    name: "wallpaper",
    data() {
        return {
            wallpaper: cloneDeep(wallpaper),
            active: "",
            authors: [],
        };
    },
    computed: {},
    watch: {
        wallpaper: {
            deep: true,
            immediate: true,
            handler() {
                this.active = this.wallpaper[0]?.name;
            },
        },
        active: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.loadAuthors();
                }
            },
        },
    },
    methods: {
        authorLink,
        showAvatar,
        getThumbnail(url) {
            // 16:9 缩略图 360x202
            return getThumbnail(url, [360, 202]);
        },
        getImgUrl(name, size, imgName) {
            return `${__cdn}design/wallpaper/${name}/${size}/${imgName}.jpg`;
        },
        getPreviewImgs(item) {
            return item.schools?.map((school) => {
                return {
                    url: this.getImgUrl(item.name, item.sizes[0], school),
                    name: school,
                };
            });
        },
        format(size) {
            return size?.replace("x", "×");
        },
        async loadAuthors() {
            const item = this.wallpaper.find((item) => item.name == this.active);
            const ids = item.authors?.join(",");
            const res = await getUsers(ids);
            this.authors = res;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/design/wallpaper.less";
</style>
