<template>
    <div class="m-database-item m-database-item__buff">
        <img class="u-icon" :title="'IconID:' + data.IconID" :src="iconLink(data.IconID)" />
        <div class="u-title">
            <div class="u-name">
                <span class="u-name-primary">{{ data.Name }}</span>
                <span class="u-name-secondary" v-if="data.BuffName"> ({{ data.BuffName }})</span>
            </div>
            <span class="u-id" title="点击快速复制" @click="copy('BuffID')">ID:{{ data.BuffID }}</span>
        </div>
        <div class="u-desc-text">
            <p class="u-desc-content">{{ data.Desc }}</p>
            <span v-if="detach_type" class="u-detach">{{ detach_type }}</span>
        </div>
        <div class="u-primary">
            <span class="u-primary-items">
                <span class="u-primary-item"> Level: {{ data.Level }} </span>
                <span class="u-primary-item"> Remark: {{ data.Remark }} </span>
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
                    <el-tooltip effect="dark" :content="key" placement="top">
                        <em :class="{ isAdv: props_buff[key] && props_buff[key]['adv'] }">
                            {{ (props_buff[key] && props_buff[key]["desc"]) || key }}
                        </em>
                    </el-tooltip>
                    <el-tooltip v-if="attrDesc(val)" effect="dark" :content="attrDesc(val)" placement="top">
                        <span>{{ val }}</span>
                    </el-tooltip>
                    <span v-else>{{ val }}</span>
                </span>
            </template>
        </div>
    </div>
</template>
<script>
import itemMixin from "./mixin";
import detach_types from "@/assets/data/database/detach_types.json";
import props_buff from "@/assets/data/database/props_buff.json";
import attr_desc from "@/assets/data/database/attr_desc.json";

export default {
    name: "ItemBuff",
    mixins: [itemMixin],
    data: () => ({
        detach_types,
        props_buff,
    }),
    computed: {
        detach_type: function () {
            const type = this.data?.DetachType;
            if (type && this.detach_types[type]) return this.detach_types[type];
            return null;
        },
    },
    methods: {
        propsFilter(key) {
            if (key === "IdKey") return false;
            if (this.data[key] === null) return false;
            if (this.props_buff?.[key]?.basic) return false;
            if (this.props_buff?.[key]?.adv && !this.hasRight) return false;
            return true;
        },
        attrDesc(attr) {
            return attr_desc[attr] ?? null;
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/database/item.less";
.m-database-item__buff {
    .u-desc-text {
        display: flex;
        align-items: center;
    }

    .u-desc-content {
        .fz(13px, 1.8);
        flex-grow: 1;
        margin: 0 0 5px 0;
    }
}
</style>
