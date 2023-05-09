<template>
    <div class="m-database-item m-database-item__npc">
        <div class="u-title">
            <div class="u-name">
                <span class="u-name-primary">{{ data.Name }}</span>
                <span class="u-name-secondary" v-if="data.BuffName"> ({{ data.BuffName }})</span>
            </div>
            <span class="u-name-add">
                <span v-if="o.Title || o.Level">&lt;</span>
                <span class="u-nick" v-if="o.Title">
                    {{ o.Title }}
                </span>
                <span v-if="o.Title && o.Level">·</span>
                <b class="u-level" v-if="o.Level">{{ o.Level }}</b>
                <span v-if="o.Title || o.Level">&gt;</span>
            </span>
            <div class="u-base">
                <span class="u-atmap" v-if="o.MapName">
                    <!-- <em>MapName</em> -->
                    {{ o.MapName }}
                </span>
                <!-- <span class="u-totation" v-if="o._Notation">
                                <em>_Notation</em>
                                {{ o._Notation }}
                            </span>-->
                <span class="u-intensity" v-if="o.Intensity">
                    强度
                    <!-- <em>Intensity</em> -->
                    {{ o.Intensity }}
                </span>
            </div>
            <span class="u-id" title="点击快速复制" @click="copy('BuffID')">ID:{{ data.BuffID }}</span>
        </div>
    </div>
</template>
<script>
import itemMixin from "./mixin";

export default {
    name: "ItemNpc",
    mixins: [itemMixin],
};
</script>
<style lang="less">
@import "~@/assets/css/database/item.less";
</style>
