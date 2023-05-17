<template>
    <div class="m-wallpaper">
        <el-tabs v-model="active">
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
                            >{{ format(size) }}</a>
                        </div>
                    </figure>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import wallpaper from "@/assets/data/design/wallpaper.json";
import { getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "wallpaper",
    data() {
        return {
            wallpaper,
            active: "",
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
    },
    methods: {
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
        format(size){
            return size?.replace('x', '×')
        }
    },
};
</script>

<style lang="less">
@import '~@/assets/css/design/wallpaper.less';
</style>
