<template>
    <div class="m-maps">
        <div class="m-maps-pic">
            <template v-if="!mapId">
                <dragWrap :data="scale">
                    <div class="m-map__world">
                        <span
                            class="u-map"
                            v-for="(item, id) in maps"
                            :key="id"
                            :style="`left:${item.Left || 0}px;top:${item.Top || 0}px`"
                            @click="showChild(item)"
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
            <div class="u-world-map" @click="changeWorldMap">世界地图</div>
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

        <el-dialog custom-class="m-maps-dialog" title="提示" :visible.sync="visible" width="600">
            <div class="m-city">
                <span v-for="(item, i) in children" :key="i" @click="showMap(item)">{{ item.szComment }}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="visible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getWorldMap, getMaps } from "@/service/maps.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import dragWrap from "./dragWrap.vue";
import { uniqBy } from "lodash";
export default {
    name: "Map",
    components: { dragWrap },
    data() {
        return {
            loading: false,
            mapId: 0,
            city: [],
            fb: [],
            maps: [],
            mapsList: [],
            search: "",
            page: 1,
            per: 17,
            count: 0,
            title: "世界地图",

            children: [],
            visible: false,
            scale: { x: -122, y: -1400, scale: 0.35 },
        };
    },
    computed: {
        currentMap() {
            return `${__imgPath}map/maps/map_${this.mapId}_0.png`;
        },
        map() {
            return `${__imgPath}topic/pic/map.jpg`;
        },
        traffic() {
            return `${__imgPath}topic/pic/traffic.png`;
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
            this.title = map_1?.szDisplayName || map_2?.DisplayName || this.title;
        },
    },
    mounted() {
        this.load();
    },
    methods: {
        changeMap(mapId) {
            this.mapId = mapId || 0;
        },
        showMap({ dwMapID, szComment }) {
            this.changeMap(dwMapID);
            this.title = szComment;
            this.visible = false;
        },
        changeWorldMap() {
            this.mapId = 0;
            this.title = "世界地图";
            this.scale = { ...this.$options.data().scale, map: Math.random() };
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
                    const { zoning, city, copy } = res.data.data || [];
                    this.city = city || [];
                    this.fb = copy || [];
                    this.maps = zoning.filter((item) => item.szDisplayName);
                })
                .finally(() => {
                    this.loading = true;
                });
            getMaps(this.params).then((res) => {
                this.mapsList = res.data.data.list || [];
                this.count = res.data.data.count;
            });
        },
        showChild({ szChildCityMaps, szChildCopyMaps }) {
            let city = [];
            let fb = [];
            if (szChildCityMaps && szChildCityMaps.length) {
                city = this.city.filter((item) => szChildCityMaps.includes(item.dwMapID));
            }
            if (szChildCopyMaps && szChildCopyMaps.length) {
                fb = this.fb.filter((item) => szChildCopyMaps.includes(item.dwMapID));
            }
            const children = city.concat(fb).filter((item) => item.szComment) || [];
            if (children.length) {
                this.children = uniqBy(children, "dwMapID");
                this.visible = true;
            }
        },
        mapLink() {
            return;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/design/map.less";
</style>
