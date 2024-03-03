<template>
    <div class="m-maps">
        <div class="m-maps-pic">
            <template v-if="!mapId">
                <dragWrap>
                    <div class="m-map__world">
                        <span
                            class="u-map"
                            @click="changeMap(item.mapid)"
                            v-for="(item, id) in maps"
                            :key="id"
                            :style="`left:${item.Left || 0}px;top:${item.Top || 0}px`"
                        >
                            {{ item.szDisplayName }}
                        </span>
                        <img class="u-img" :src="map" alt="世界地图" />
                        <img class="u-traffic" :src="traffic" alt="交通路线" />
                    </div>
                </dragWrap>
            </template>

            <img :src="currentMap" v-else />
        </div>

        <div class="m-toolbar">
            <h1 class="m-maps__title">{{ title }}</h1>
            <el-input size="small" v-model="search" clearable>
                <template slot="prepend">地图</template>
            </el-input>
            <el-button-group>
                <el-button type="primary" size="small" icon="el-icon-arrow-left" @click="changePage('prev')"
                    >上一页</el-button
                >
                <el-button type="primary" size="small" @click="changePage('next')">
                    下一页
                    <i class="el-icon-arrow-right el-icon--right"></i>
                </el-button>
            </el-button-group>
            <div class="u-world-map" @click="changeMap(0)">世界地图</div>
            <div :class="[{ mapId }, 'm-mapList']">
                <div
                    v-for="item in mapsList"
                    :key="item.ID"
                    :label="item.MapName"
                    :value="item.ID"
                    @click="changeMap(item.ID)"
                    :class="['u-item', { active: item.ID == mapId }]"
                >
                    {{ item.DisplayName }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getWorldMap, getMaps } from "@/service/maps.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import dragWrap from "./dragWrap.vue";
export default {
    name: "Map",
    components: { dragWrap },
    data() {
        return {
            loading: false,
            mapId: 0,
            maps: [],
            mapsList: [],
            search: "",
            page: 1,
            per: 17,
            count: 0,
            title: "世界地图",

            scale: {
                initWidth: 0, // 父元素的宽-自适应值
                initHeight: 0, // 父元素的高-自适应值
                elWidth: 0, // 元素宽
                elHeight: 0, // 元素高
                meter_zoom: 0.28, // 子元素缩放比例
                isDragging: false,
                dragStartX: 0,
                dragStartY: 0,
                zoomOriginX: 0,
                zoomOriginY: 0,
                click: false,
            },
        };
    },
    computed: {
        currentMap() {
            return `${__imgPath}map/maps/map_${this.mapId}_0.png`;
        },
        map() {
            return `${__imgPath}topic/pic/map.jpg?123`;
        },
        traffic() {
            return `${__imgPath}topic/pic/traffic.png?123`;
        },
        client() {
            return this.$store.state.client;
        },
        params() {
            const _params = {
                per: this.per,
                page: this.page,
                client: this.client,
            };
            if (this.search) _params.search = this.search;
            return _params;
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function () {
                this.load();
            },
        },
        mapId(val) {
            if (val === null || val === "" || val === undefined) this.mapId = 0;
            const map_1 = this.maps.filter((item) => item.ID == val)[0];
            const map_2 = this.mapsList.filter((item) => item.ID == val)[0];
            this.title = map_1?.szDisplayName || map_2?.DisplayName || "世界地图";
        },
    },
    mounted() {
        this.load();
    },
    methods: {
        changeMap(mapId) {
            this.mapId = mapId || 0;
            this.scale = this.$options.data().scale;
        },
        changePage(key) {
            let page = this.page;
            if (key === "prev") {
                page--;
            } else if (page < this.count / this.per) {
                page++;
            }
            this.page = page < 0 ? 0 : page;
        },
        load() {
            this.loading = true;
            getWorldMap()
                .then((res) => {
                    const list = res.data.data.zoning || []; 
                    this.maps = list.filter((item) => item.szDisplayName);
                })
                .finally(() => {
                    this.loading = true;
                });
            getMaps(this.params).then((res) => {
                this.mapsList = res.data.data.list || [];
                this.count = res.data.data.count;
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/design/map.less";
</style>
