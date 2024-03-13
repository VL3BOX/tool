<template>
    <div class="m-maps">
        <div class="m-maps-pic">
            <template v-if="!mapId">
                <dragWrap :data="scale">
                    <div class="m-map__world">
                        <template v-for="(item, id) in maps">
                            <div
                                class="u-map"
                                v-if="!(item.szDisplayName.includes('战乱') || item.szDisplayName.includes('乱世'))"
                                :key="id"
                                :style="`left:${item.Left || 0}px;top:${item.Top || 0}px`"
                                @click="showChild(item)"
                            >
                                <div class="u-map-city_name">
                                    <img class="u-item_bg" :src="getIcon('newworldmap_03_10')" />
                                    <span class="u-item_text">{{ item.szDisplayName }}</span>
                                </div>
                                <!-- 暂时无用图标 -->
                                <!-- <img :src="getIcon('newworldmap_03_3')" />
                                <img :src="getIcon('newworldmap_03_8')" /> -->
                                <img class="u-map-city_img" :src="item.szButtonShowImg" />
                            </div>
                        </template>
                        <img class="u-img" :src="map" @click="visible = false" alt="世界地图" />
                        <img class="u-traffic" :src="traffic" alt="交通路线" />
                    </div>
                </dragWrap>
            </template>

            <img :src="currentMap" v-else />

            <!-- 世界地图选择弹框 -->
            <div
                class="m-select-box"
                :class="{
                    'm-select-box__hide': !visible,
                }"
            >
                <div class="m-select__item">
                    <div class="u-item-title">
                        <img class="u-img" :src="getIcon('newworldmap_03_39')" />
                        <span class="u-text">周边城镇</span>
                    </div>
                    <div class="u-item-option">
                        <div
                            class="u-item"
                            v-for="(item, index) in selectMap.city"
                            :key="index"
                            @click="showMap(item)"
                            :style="{
                                backgroundImage: `url(${getIcon('newworldmap_03_33')})`,
                            }"
                        >
                            <img class="u-img" :src="item.szButtonShowImg" />
                            <span class="u-text">{{ item.szComment }}</span>
                        </div>
                    </div>
                </div>
                <div class="m-select__item" v-if="selectMap.fb.length">
                    <div class="u-item-title">
                        <img class="u-img" :src="getIcon('newworldmap_03_39')" />
                        <span class="u-text">周边秘境</span>
                    </div>
                    <div class="m-select-arrow-box" v-if="selectMapOptions.maxCurrent">
                        <img
                            v-if="selectMapOptions.current != 1"
                            @click="selectMapChange('after')"
                            class="u-item-arrow u-item-arrow_left"
                            :src="getIcon('newworldmap_03_29')"
                        />
                        <img
                            v-else
                            class="u-item-arrow u-item-arrow_left u-item-arrow_dis"
                            :src="getIcon('newworldmap_03_31')"
                        />
                    </div>
                    <div class="u-item-option">
                        <template v-for="(item, index) in selectMap.fb">
                            <div
                                v-if="index >= selectMapOptions.after && index < selectMapOptions.before"
                                class="u-item"
                                :key="index"
                                @click="showMap(item)"
                                :style="{
                                    backgroundImage: `url(${getIcon('newworldmap_03_33')})`,
                                }"
                            >
                                <img class="u-img" :src="item.szButtonShowImg" />
                                <span class="u-text">{{ item.szShowName || item.szComment }}</span>
                            </div>
                        </template>
                    </div>
                    <div class="m-select-arrow-box" v-if="selectMapOptions.maxCurrent">
                        <img
                            v-if="selectMapOptions.current != selectMapOptions.maxCurrent"
                            @click="selectMapChange('before')"
                            class="u-item-arrow u-item-right"
                            :src="getIcon('newworldmap_03_25')"
                        />
                        <img
                            v-else
                            class="u-item-arrow u-item-right u-item-arrow_dis"
                            :src="getIcon('newworldmap_03_28')"
                        />
                    </div>
                </div>
            </div>
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

        <!-- <el-dialog custom-class="m-maps-dialog" title="提示" :visible.sync="visible" width="600">
            <div class="m-city">
                <span v-for="(item, i) in children" :key="i" @click="showMap(item)">{{ item.szComment }}</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="visible = false">关 闭</el-button>
            </span>
        </el-dialog> -->
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

            selectMap: {
                city: [],
                fb: [],
            },
            selectMapOptions: {
                current: 1,
                maxCurrent: 0,
                after: 0,
                before: 0,
            },
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
                    this.maps = zoning
                        .filter((item) => item.szDisplayName)
                        .map((item) => {
                            item.szButtonShowImg = this.getGoMapImg(item);
                            return item;
                        });
                })
                .finally(() => {
                    this.loading = true;
                });
            getMaps(this.params).then((res) => {
                this.mapsList = res.data.data.list || [];
                this.count = res.data.data.count;
            });
        },
        showChild({ szChildCityMaps, szChildCopyMaps, Left, Top }) {
            // 定位地图位置到当前选择位置
            this.scale = { x: 4920 - Left - 2444, y: 3456 - Top - 2979, scale: 1 };
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
                let newChildren = { city: [], fb: [] };
                children.forEach((item) => {
                    item.szButtonShowImg = this.getGoMapImg(item);
                    if ("szVersion" in item) {
                        newChildren.fb.push(item);
                    } else {
                        newChildren.city.push(item);
                    }
                });
                this.selectMap = newChildren;
                // 计算秘境是否可以左右切换
                let intervalValue = 6 - this.selectMap.city.length;
                if (this.selectMap.fb.length > intervalValue) {
                    // 需要切换
                    this.selectMapOptions = {
                        current: 1,
                        maxCurrent: Math.ceil(this.selectMap.fb.length / intervalValue),
                        value: intervalValue,
                        after: 0,
                        before: intervalValue,
                    };
                } else {
                    this.selectMapOptions = {
                        after: 0,
                        before: this.selectMap.fb.length,
                        maxCurrent: 0,
                    };
                }
                this.visible = true;
            }
        },
        selectMapChange(type) {
            if (type == "after") {
                this.selectMapOptions.current = this.selectMapOptions.current - 1;
                this.selectMapOptions.after = this.selectMapOptions.after - this.selectMapOptions.value;
                this.selectMapOptions.before = this.selectMapOptions.before - this.selectMapOptions.value;
            } else if (type == "before") {
                this.selectMapOptions.current = this.selectMapOptions.current + 1;
                this.selectMapOptions.after = this.selectMapOptions.after + this.selectMapOptions.value;
                this.selectMapOptions.before = this.selectMapOptions.before + this.selectMapOptions.value;
            }
        },
        mapLink() {
            return;
        },
        getGoMapImg(itemData) {
            let finalResult = "";
            if (itemData.szButtonImg.includes(".UITex")) {
                finalResult = itemData.szButtonImg
                    .substring(itemData.szButtonImg.indexOf("NewWorldMap"), itemData.szButtonImg.lastIndexOf(".UITex"))
                    .concat("_", itemData.nFrame);
            } else {
                finalResult = `NewWorldMap/fb/${itemData.szButtonImg}`;
            }
            const lowercaseString = finalResult.toLowerCase();
            return `${__imgPath}map2/std/${lowercaseString}.png`;
        },
        getIcon(key) {
            return `${__imgPath}map2/std/newworldmap/${key}.png`;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/design/map.less";
</style>
