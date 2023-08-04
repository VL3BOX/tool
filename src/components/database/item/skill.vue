<template>
    <div class="m-database-item m-database-item__skill">
        <!-- 项目基本信息 -->
        <div class="m-item">
            <img class="u-icon" :title="'IconID:' + data.IconID" :src="iconLink(data.IconID)" />
            <div class="u-title">
                <div class="u-name">
                    <span class="u-name-primary">{{ data.Name }}</span>
                    <span class="u-name-secondary" v-if="data.SkillName"> ({{ data.SkillName }})</span>
                </div>
                <el-tag size="medium" @click.stop="copy('SkillID')">
                    <i class="el-icon-document-copy u-copy"></i>
                    <span class="u-id" title="点击快速复制">ID:{{ data.SkillID }}</span>
                </el-tag>
            </div>
            <div class="u-desc-text">
                <p class="u-desc-content">{{ filterRaw(data.Desc) }}</p>
            </div>
            <div class="u-primary">
                <span class="u-primary-items">
                    <span class="u-primary-item"> Level: {{ data.Level }} </span>
                    <span class="u-primary-item"> Remark: {{ data.Remark }} </span>
                    <span class="u-primary-item" v-if="data.HelpDesc">HelpDesc : {{ data.HelpDesc }}</span>
                    <span class="u-primary-item" v-if="data.SimpleDesc">SimpleDesc : {{ data.SimpleDesc }}</span>
                    <span class="u-primary-item" v-if="data.SpecialDesc">SpecialDesc : {{ data.SpecialDesc }}</span>
                </span>
            </div>
            <el-button v-if="showDetail" class="u-props-toggle" :class="{ 'is-active': showProps }" @click="toggleProps">
                <i class="el-icon-view"></i>
                <span v-if="showProps">收起属性</span>
                <span v-else>查看属性</span>
            </el-button>
        </div>
        <!-- 项目详情，仅在单页展示 -->
        <template v-if="showDetail">
            <!-- 详细字段列表 -->
            <div class="m-detail" v-if="showProps">
                <template v-for="(val, key) in data">
                    <span class="u-prop" :key="key" v-if="propsFilter(key)">
                        <el-tooltip effect="dark" :content="key" placement="top">
                            <em :class="{ isAdv: props_skill[key] && props_skill[key]['adv'] }">
                                {{ (props_skill[key] && props_skill[key]["desc"]) || key }}
                            </em>
                        </el-tooltip>
                        <span>{{ val }}</span>
                    </span>
                </template>
            </div>
            <!-- 项目操作 -->
            <div class="m-operation" v-if="isLogin">
                <el-button
                    v-if="!star_id"
                    class="u-button u-star"
                    icon="el-icon-star-off"
                    plain
                    @click="star('skill', data.SkillID, data.Level)"
                >
                    收藏数据
                </el-button>
                <el-button
                    v-else-if="isLogin"
                    class="u-button u-stared"
                    icon="el-icon-star-on"
                    plain
                    @click="cancelStar"
                >
                    取消收藏
                </el-button>
                <el-button
                    class="u-button u-to-dbm"
                    icon="el-icon-connection"
                    plain
                    @click="toDbm('skill', data.SkillID, data.Level)"
                >
                    在线构建
                </el-button>
            </div>
        </template>
    </div>
</template>
<script>
import itemMixin from "./mixin";
import props_skill from "@/assets/data/database/props_skill.json";

export default {
    name: "ItemSkill",
    mixins: [itemMixin],
    data: () => ({
        props_skill,
    }),
    methods: {
        propsFilter(key) {
            if (key === "IdKey") return false;
            if (this.data[key] === null) return false;
            if (this.props_skill?.[key]?.basic) return false;
            if (this.props_skill?.[key]?.adv && !this.hasRight) return false;
            return true;
        },
    },
};
</script>
<style lang="less">
@import "~@/assets/css/database/item.less";
.m-database-item__skill {
    .u-desc-text {
        display: flex;
        align-items: center;
    }

    .u-desc-content {
        .fz(13px, 1.8);
        flex-grow: 1;
        margin: 0 0 5px 0;
        white-space: pre-wrap;
    }
}
</style>
