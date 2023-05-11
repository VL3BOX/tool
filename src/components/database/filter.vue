<template>
    <div class="m-database-filter">
        <div class="w-card-title">筛选条件</div>
        <div class="m-filters">
            <div class="u-client">
                <el-radio-group v-model="clientModel" size="medium">
                    <el-radio-button label="std">重制</el-radio-button>
                    <el-radio-button label="origin">缘起</el-radio-button>
                </el-radio-group>
            </div>
            <div class="u-keyword">
                <div class="u-input-label">ID / 名称</div>
                <el-input placeholder="请输入 ID 或 名称" v-model="query.keyword"> </el-input>
            </div>
            <div class="u-level">
                <div class="u-input-label">等级</div>
                <el-input placeholder="请输入等级" v-model="query.level"> </el-input>
            </div>
            <div class="u-map" v-if="type == 'npc'">
                <div class="u-input-label">地图</div>
                <el-input placeholder="请输入NPC所在地图" v-model="query.map"> </el-input>
            </div>
            <div class="u-opr">
                <div class="u-strict">
                    <el-switch
                        v-model.number="query.strict"
                        active-text="精确匹配"
                        :inactive-value="0"
                        :active-value="1"
                    ></el-switch>
                </div>
                <el-button type="primary">搜索</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "DatabaseFilter",
    props: {
        type: {
            type: String,
            default: "buff",
        },
        client: {
            type: String,
            default: "std",
        },
        query: Object,
    },
    computed: {
        clientModel: {
            get() {
                return this.client;
            },
            set(val) {
                this.$emit("update:client", val);
            },
        },
    },
};
</script>
<style lang="less">
.m-database-filter {
    .u-client .el-radio-group {
        width: 100%;

        .el-radio-button {
            width: 50%;
        }

        .el-radio-button__inner {
            width: 100%;
        }
    }
    .m-filters {
        padding: 10px;
    }
    .m-filters > div {
        .mb(12px);
    }
    .u-opr {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .u-input-label {
        .fz(12px, 14px);
        .mb(6px);
        .bold;
        color: #999;
    }
}
</style>
