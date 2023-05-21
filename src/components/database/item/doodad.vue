<template>
    <div class="m-database-item m-database-item__doodad">
        <!-- 项目基本信息 -->
        <div class="m-item">
            <img class="u-icon" :title="'IconID:' + 10909" :src="iconLink(10909)" />
            <div class="u-title">
                <span class="u-name">{{ data.Name }}</span>
                <span class="u-id" title="点击快速复制" @click="copy(ID)">ID:{{ data.ID }}</span>
            </div>
            <div class="u-primary u-primary__doodad">
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
            </div>
        </div>
        <!-- 项目详情，仅在单页展示 -->
        <template v-if="showDetail">
            <!-- 详细字段列表 -->
            <div class="m-detail">
                <template v-for="(val, key) in data">
                    <span class="u-prop" :key="key" v-if="propsFilter(key)">
                        <em>{{ key }}</em>
                        {{ val }}
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
                    @click="star('doodad', data.ID)"
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
                    @click="toDbm('doodad', data.ID, data.Level)"
                >
                    在线构建
                </el-button>
            </div>
            <!-- 评论组件 -->
            <el-divider content-position="left"><i class="el-icon-chat-line-square"></i> 评论</el-divider>
            <Comment class="m-comment" :id="database_key" category="doodad" />
        </template>
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
    .u-primary__doodad {
        .fz(12px, 1.8);
        display: flex;
        gap: 16px;
        flex-grow: 1;

        em {
            font-style: normal;
            background-color: #eee;
            color: #999;
            padding: 0 5px;
            margin: 0 3px;
            .r(3px);
        }
    }
}
</style>
