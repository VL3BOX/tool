<template>
    <div class="m-database-item m-database-item__doodad">
        <img class="u-icon" :title="'IconID:' + 10909" :src="iconLink(10909)" />
        <div class="u-title">
            <span class="u-name">{{ data.Name }}</span>
            <span class="u-id" title="点击快速复制" @click="copy(ID)">ID:{{ data.ID }}</span>
        </div>
        <div class="u-primary">
            <span class="u-desc">
                <span class="u-doodad-prop">
                    <em>地图</em>
                    {{ data.MapName }}
                </span>
                <span class="u-doodad-prop">
                    <em>说明</em>
                    {{ data.BarText }}
                </span>
                <span class="u-doodad-prop" v-if="data.Kind">
                    <em>类型</em>
                    {{ data.Kind }}
                </span>
            </span>
            <el-button
                class="u-open-button"
                :class="{ on: showDetail }"
                icon="el-icon-view"
                plain
                size="mini"
                @click="toggleDetail"
                v-if="hasRight"
            >
                {{ showDetail ? "收起详情" : "展开详情" }}
            </el-button>
        </div>
        <div class="u-detail" v-if="hasRight" v-show="showDetail">
            <template v-for="(val, key) in data">
                <span class="u-prop" :key="key" v-if="propsFilter(key)">
                    <em>{{ key }}</em>
                    {{ val }}
                </span>
            </template>
        </div>
    </div>
</template>
<script>
import itemMixin from "./mixin";
export default {
    name: "ItemDoodad",
    mixins: [itemMixin],
    methods: {
        propsFilter(key) {
            if (key === "IdKey") return false;
            if (this.data[key] === null) return false;
            return true;
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/database/item.less";
.m-database-item__doodad {
    .u-desc {
        .fz(12px, 1.8);
        display: flex;
        gap: 16px;
        flex-grow: 1;
        margin: 4px 0;
    }
}
</style>
