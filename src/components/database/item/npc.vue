<template>
    <div class="m-database-item__npc">
        <div class="u-title">
            <div class="u-name">
                <span class="u-name-primary">{{ data.Name }}</span>
                <span class="u-name-secondary" v-if="data.BuffName"> ({{ data.BuffName }})</span>
            </div>
            <span class="u-name-add">
                <span v-if="data.Title || data.Level">&lt;</span>
                <span class="u-nick" v-if="data.Title">
                    {{ data.Title }}
                </span>
                <span v-if="data.Title && data.Level">·</span>
                <b class="u-level" v-if="data.Level">{{ data.Level }}</b>
                <span v-if="data.Title || data.Level">&gt;</span>
            </span>
            <div class="u-base">
                <span class="u-map" v-if="data.MapName">
                    {{ data.MapName }}
                </span>
                <span class="u-intensity" v-if="data.Intensity">
                    <span>强度</span>
                    <span>{{ data.Intensity }}</span>
                </span>
            </div>
            <Mark
                class="u-id"
                BGL="#333"
                :value="'ID:' + data.ID"
                :key="data.ID"
                title="点击快速复制"
                @click.native="copy('ID')"
            />
        </div>
        <div class="u-primary">
            <div class="u-life">
                <img class="u-desc-icon u-desc-icon-life" svg-inline src="@/assets/img/database/energy.svg" />
                <b>血量</b>
                <em>MaxLife</em>
                <strong>{{ data.MaxLife }}</strong>
            </div>
            <div class="u-mana">
                <img class="u-desc-icon u-desc-icon-mana" svg-inline src="@/assets/img/database/energy.svg" />
                <b>内力</b>
                <em>MaxMana</em>
                <strong>{{ data.MaxMana }}</strong>
            </div>
            <div class="u-speed" v-if="data.RunSpeed || data.WalkSpeed">
                <img class="u-desc-icon u-desc-icon-speed" svg-inline src="@/assets/img/database/speed.svg" />
                <b>跑速</b>
                <em>RunSpeed</em>
                <strong>{{ data.RunSpeed || data.WalkSpeed }}</strong>
            </div>
            <div class="u-touch" v-if="data.TouchRange">
                <img class="u-desc-icon u-desc-icon-touch" svg-inline src="@/assets/img/database/radar.svg" />
                <b>范围</b>
                <em>TouchRange</em>
                <strong>{{ data.TouchRange }}</strong>
            </div>
            <div class="u-sense" v-if="data.Sense">
                <img class="u-desc-icon u-desc-icon-sense" svg-inline src="@/assets/img/database/sight.svg" />
                <b>识破</b>
                <em>Sense</em>
                <strong>{{ data.Sense }}</strong>
            </div>
            <div class="u-dodge" v-if="data.Dodge">
                <img class="u-desc-icon u-desc-icon-dodge" svg-inline src="@/assets/img/database/miss.svg" />
                <b>闪避</b>
                <em>Dodge</em>
                <strong>{{ data.Dodge }}</strong>
            </div>
            <div class="u-dodge" v-if="data.Parry">
                <img class="u-desc-icon u-desc-icon-dodge" svg-inline src="@/assets/img/database/miss.svg" />
                <b>招架</b>
                <em>Parry</em>
                <strong>{{ data.ParryValue }}</strong>
            </div>
            <div class="u-shield">
                <img class="u-desc-icon u-desc-icon-shield" svg-inline src="@/assets/img/database/shield.svg" />
                <b>防御</b>
                <em>Shield</em>
                <span class="u-prop-item">
                    外功防御
                    <em>PhysicsShieldBase</em>
                    <span class="u-value">{{ ~~data.PhysicsShieldBase }}</span>
                </span>
                <span class="u-prop-item">
                    混元防御
                    <em>NeutralMagicDefence</em>
                    <span class="u-value">{{ ~~data.NeutralMagicDefence }}</span>
                </span>
                <span class="u-prop-item">
                    阳性防御
                    <em>SolarMagicDefence</em>
                    <span class="u-value">{{ ~~data.SolarMagicDefence }}</span>
                </span>
                <span class="u-prop-item">
                    阴性防御
                    <em>LunarMagicDefence</em>
                    <span class="u-value">{{ ~~data.LunarMagicDefence }}</span>
                </span>
                <span class="u-prop-item">
                    毒性防御
                    <em>PoisonMagicDefence</em>
                    <span class="u-value">{{ ~~data.PoisonMagicDefence }}</span>
                </span>
            </div>
            <div class="u-critical">
                <img class="u-desc-icon u-desc-icon-attack" svg-inline src="@/assets/img/database/attack.svg" />
                <b>会心</b>
                <em>Critical</em>
                <span class="u-prop-item">
                    外功会心
                    <em>PhysicsCriticalStrike</em>
                    <span class="u-value">{{ ~~data.PhysicsCriticalStrike }}</span>
                </span>
                <span class="u-prop-item">
                    混元会心
                    <em>NeutralCriticalStrike</em>
                    <span class="u-value">{{ ~~data.NeutralCriticalStrike }}</span>
                </span>
                <span class="u-prop-item">
                    阳性会心
                    <em>SolarCriticalStrike</em>
                    <span class="u-value">{{ ~~data.SolarCriticalStrike }}</span>
                </span>
                <span class="u-prop-item">
                    阴性会心
                    <em>LunarCriticalStrike</em>
                    <span class="u-value">{{ ~~data.LunarCriticalStrike }}</span>
                </span>
                <span class="u-prop-item">
                    毒性会心
                    <em>PoisonCriticalStrike</em>
                    <span class="u-value">{{ ~~data.PoisonCriticalStrike }}</span>
                </span>
            </div>
            <div class="u-attack">
                <img class="u-desc-icon u-desc-icon-attack" svg-inline src="@/assets/img/database/target.svg" />
                <b>命中</b>
                <em>Attack</em>
                <span class="u-prop-item">
                    外功命中
                    <em>PhysicsAttackHit</em>
                    <span class="u-value">{{ ~~data.PhysicsAttackHit }}</span>
                </span>
                <span class="u-prop-item">
                    混元命中
                    <em>NeutralMagicHit</em>
                    <span class="u-value">{{ ~~data.NeutralMagicHit }}</span>
                </span>
                <span class="u-prop-item">
                    阳性命中
                    <em>SolarMagicHit</em>
                    <span class="u-value">{{ ~~data.SolarMagicHit }}</span>
                </span>
                <span class="u-prop-item">
                    阴性命中
                    <em>LunarMagicHit</em>
                    <span class="u-value">{{ ~~data.LunarMagicHit }}</span>
                </span>
                <span class="u-prop-item">
                    毒性命中
                    <em>PoisonMagicHit</em>
                    <span class="u-value">{{ ~~data.PoisonMagicHit }}</span>
                </span>
            </div>
            <div class="u-buttons">
                <el-button
                    class="u-raw"
                    :class="{ on: showDetail }"
                    icon="el-icon-view"
                    plain
                    size="mini"
                    v-if="hasRight"
                    @click="toggleDetail"
                    >{{ showDetail ? "收起详情" : "展开详情" }}</el-button
                >
                <el-button
                    class="u-button u-to-dbm"
                    icon="el-icon-connection"
                    plain
                    size="mini"
                    @click="toDbm('npc', data.ID, data.Level)"
                >
                    在线构建
                </el-button>
                <el-button
                    v-if="!star_id"
                    class="u-button u-star"
                    icon="el-icon-star-off"
                    plain
                    size="mini"
                    @click="star('npc', data.ID)"
                >
                    收藏数据
                </el-button>
                <el-button v-else-if="isLogin" class="u-button u-stared" icon="el-icon-star-on" plain size="mini" @click="cancelStar">
                    取消收藏
                </el-button>
            </div>
        </div>
        <div class="u-props" :class="{ on: showDetail }" v-if="hasRight">
            <template v-for="(val, key) in data">
                <span class="u-desc" :key="key" v-if="propsFilter(key)">
                    <el-tooltip effect="light" :content="showKeyLabel(key)" placement="top">
                        <em>{{ key }}</em>
                    </el-tooltip>
                    {{ val }}
                </span>
            </template>
        </div>
    </div>
</template>
<script>
import itemMixin from "./mixin";
import props_npc from "@/assets/data/database/props_npc.json";

export default {
    name: "ItemNpc",
    mixins: [itemMixin],
    methods: {
        propsFilter(key) {
            if (key === "IdKey") return false;
            if (this.data[key] === null) return false;
            if (props_npc?.[key]?.basic) return false;
            return true;
        },
        showKeyLabel(key) {
            return props_npc?.[key]?.desc || key;
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/database/item.less";
</style>
