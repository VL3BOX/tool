<template>
    <div class="m-maps">
        <h1 class="m-maps__title">剑三地图库</h1>
        <div class="m-toolbar">
            <div class="w-select">
                <div class="u-select-label">地图</div>
                <el-select v-model="mapId" placeholder="请选择地图" filterable clearable>
                    <el-option v-for="item in maps" :key="item.id" :label="item.label" :value="item.id"></el-option>
                </el-select>
            </div>
        </div>
        <!-- 世界地图 -->
        <!-- mapId 为空时为世界地图，选择框选择地图和在世界地图中选择地图效果一致，都切换到具体地图。 -->
        <div class="m-map__wrap">
            <div class="m-map__world" v-if="!mapId">
                <img :src="map" alt="世界地图" />
                <span
                    class="u-map"
                    @click="toMap(id)"
                    v-for="(item, id) in mapData"
                    :key="id"
                    :style="`left:${item.left || 0}px;top:${item.top || 0}px`"
                >
                    {{ item.name }}
                </span>
            </div>
            <!-- 具体地图 -->
            <div v-else class="m-map__simple">
                <img :src="currentMap" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import mapData from "@/assets/data/map.json";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Map",
    data() {
        return {
            loading: false,
            mapId: "",
            maps: [],
            mapData,
        };
    },
    computed: {
        ...mapState(["mapIndex"]),
        currentMap() {
            return `${__imgPath}map/maps/map_${this.mapId}_0.png`;
        },
        map() {
            return `${__imgPath}topic/pic/map.jpg`;
        },
    },
    watch: {
        mapIndex: {
            immediate: true,
            deep: true,
            handler(obj) {
                this.maps = this.map2arr(obj).filter((item) => item.id !== "3");
            },
        },
    },
    mounted() {
        this.getMapIndex();
    },
    methods: {
        ...mapActions(["getMapIndex"]),
        map2arr(map) {
            return Object.entries(map).map(([key, value]) => {
                return {
                    id: key,
                    label: value,
                };
            });
        },
        toMap(mapId) {
            this.mapId = mapId;
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/design/map.less";
</style>
