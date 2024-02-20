<template>
    <div class="m-maps">
        <div class="m-maps-pic" ref="mapView">
            <div
                class="m-map__wrap"
                ref="mapWrap"
                @mousedown="handleMouseDown"
                @mousemove="handleMouseMove"
                @mouseup="handleMouseUp"
                @wheel="handleWheel"
                v-if="!mapId"
            >
                <div
                    class="m-map__world"
                    ref="map"
                    :style="`left:${(0 * elWidth) / 100}px;top:${
                        (25 * elHeight) / 100
                    }px;transform-origin: ${zoomOriginX}px ${zoomOriginY}px; transform: scale(${meter_zoom});cursor: ${
                        isDragging ? 'grabbing' : 'grab'
                    }`"
                >
                    <span
                        class="u-map"
                        @click="changeMap(item.MapID)"
                        v-for="(item, id) in mapData"
                        :key="id"
                        :style="`left:${item.x || 0}px;top:${item.y || 0}px`"
                    >
                        {{ item.comment }}
                    </span>
                    <img class="u-img" :src="map" :alt="$t('世界地图')" style="width: 3556px; height: 2195px" />
                </div>
            </div>
            <img :src="currentMap" v-else />
        </div>
        <div class="m-toolbar">
            <h1 class="m-maps__title">{{ title }}</h1>
            <el-input size="small" v-model="search" clearable>
                <template slot="prepend">{{ $t('地图') }}</template>
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
            <div class="u-world-map" @click="changeMap(0)">{{ $t('世界地图') }}</div>
            <div class="m-mapList">
                <div
                    class="u-item"
                    v-for="item in maps"
                    :key="item.ID"
                    :label="item.MapName"
                    :value="item.ID"
                    @click="changeMap(item.ID)"
                >
                    {{ item.MapName || item.Name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getMaps, getMapsIdPoint, getMapsTraffic } from "@/service/maps.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Map",
    data() {
        return {
            loading: false,
            mapId: 0,
            maps: [],
            mapData: [],

            search: "",
            page: 1,
            per: 18,
            count: 0,

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
        };
    },
    computed: {
        currentMap() {
            return `${__imgPath}map/maps/map_${this.mapId}_0.png`;
        },
        map() {
            return `${__imgPath}topic/pic/map.jpg?123`;
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
        title() {
            const item = this.maps.filter((item) => item.ID == this.mapId)[0];
            return item?.Name || "剑三地图库";
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
        },
    },
    mounted() {
        this.load();
        this.loadOther();
        this.initBodySize();
    },
    methods: {
        changeMap(mapId) {
            this.mapId = mapId;
            this.rest();
        },
        rest() {
            this.meter_zoom = 0.28;
            this.zoomOriginX = 0;
            this.zoomOriginY = 0;
            this.click = false;
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
            getMaps(this.params)
                .then((res) => {
                    const list = res.data.data.list || [];
                    this.count = res.data.data.count;
                    this.maps = list.map((item) => {
                        if (!item.ID) item.MapName = "世界地图";
                        return item;
                    });
                })
                .finally(() => {
                    this.loading = true;
                });
        },
        loadOther() {
            getMapsIdPoint({ client: this.client }).then((res) => {
                const data = res.data.data || [];
                this.mapData = data
                    .filter(
                        (obj) =>
                            obj.comment &&
                            !obj.comment?.includes("测试") &&
                            obj.x < 10000 &&
                            obj.y < 10000 &&
                            obj.x > 0 &&
                            obj.y > 0 &&
                            !obj.comment?.includes("扬州_")
                    )
                    .map((item) => {
                        item.y = item.y + 50;
                        item.x = item.x + 150;
                        return item;
                    });
            });
            // getMapsTraffic({ client: this.client }).then((res) => {
            //     // console.log(res.data.data);
            // });
        },
        handleWheel(event) {
            const delta = event.deltaY || event.detail || event.wheelDelta;
            let scaleNum = 0.05;
            if (delta < 0) {
                // 向上滚动，放大元素
                this.meter_zoom += scaleNum;
                if (this.meter_zoom > 1.8) {
                    this.meter_zoom = 1.8;
                }
            } else {
                // 向下滚动，缩小元素
                this.meter_zoom -= scaleNum;
                if (this.meter_zoom < 0.28) {
                    this.meter_zoom = 0.28;
                }
            }

            // 获取鼠标点击位置相对于地图容器的坐标
            const boundingRect = this.$refs.mapWrap.getBoundingClientRect();
            const mouseX = this.click ? (event.clientX - boundingRect.left) / this.meter_zoom : 0;
            const mouseY = this.click ? (event.clientY - boundingRect.top) / this.meter_zoom : 0;

            // 计算图片上的相对坐标
            const relativeX = mouseX - parseFloat(this.$refs.map.style.left);
            const relativeY = mouseY - parseFloat(this.$refs.map.style.top);

            // 更新缩放中心点的位置
            this.zoomOriginX = relativeX;
            this.zoomOriginY = relativeY;

            // 更新缩放比例
            this.$refs.map.style.transformOrigin = `${this.zoomOriginX}px ${this.zoomOriginY}px`;
            this.$refs.map.style.transform = `scale(${this.meter_zoom})`;
            event.preventDefault();
        },
        initBodySize() {
            const imageWidth = 3556;
            const imageHeight = 2195;

            this.initWidth = this.$refs.mapView.clientWidth;
            this.initHeight = this.initWidth * (imageHeight / imageWidth);
            this.elWidth = this.initWidth * (100 / (imageWidth / 2));
            this.elHeight = this.initHeight * (100 / (imageHeight / 2));
        },
        handleMouseDown(event) {
            this.isDragging = true;
            this.click = true;
            this.dragStartX = event.clientX;
            this.dragStartY = event.clientY;
        },
        handleMouseMove(event) {
            if (this.isDragging) {
                const deltaX = event.clientX - this.dragStartX;
                const deltaY = event.clientY - this.dragStartY;

                // 更新地图的 left 和 top 属性
                const mapElement = this.$refs.map;
                mapElement.style.left = `${parseFloat(mapElement.style.left) + deltaX}px`;
                mapElement.style.top = `${parseFloat(mapElement.style.top) + deltaY}px`;

                this.dragStartX = event.clientX;
                this.dragStartY = event.clientY;
            }
        },
        handleMouseUp() {
            this.isDragging = false;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/design/map.less";
</style>
