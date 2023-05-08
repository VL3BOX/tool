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
                <el-input placeholder="请输入 ID 或 名称" v-model="query.keyword">
                    <template slot="prepend">ID / 名称</template>
                </el-input>
            </div>
            <div class="u-level">
                <el-input placeholder="请输入等级" v-model="query.level">
                    <template slot="prepend">等级</template>
                </el-input>
            </div>
            <div class="u-map">
                <el-input placeholder="请输入NPC所在地图" v-model="query.map">
                    <template slot="prepend">地图</template>
                </el-input>
            </div>
            <div class="u-opr">
                <div class="u-strict">
                    <el-switch v-model="query.strict" active-text="精确匹配"></el-switch>
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
    },
    data: () => ({
        query: {
            keyword: "",
            level: "",
            map: "",
            strict: false,
        },
    }),
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
        padding: 10px 0;
    }
    .m-filters > div {
        .mb(12px);
    }
    .u-opr {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>
