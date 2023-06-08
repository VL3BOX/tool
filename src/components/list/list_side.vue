<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>工具作者交流群</em> :
            <strong @click="onQQClick" class="u-link" title="点击复制">
                <a>{{ qq }}</a>
            </strong>
        </RightSideMsg>

        <div class="m-tool-side">
            <el-collapse v-model="tab">
                <el-collapse-item title="💠 版规与要求" name="rule" class="m-tool-rule">
                    <div class="u-content" v-html="rules"></div>
                </el-collapse-item>
                <el-collapse-item title="🌀 魔盒API文档索引" name="api" class="m-tool-api">
                    <div class="u-list" v-if="apis && apis.length">
                        <a
                            class="u-item"
                            v-for="(item, i) in apis"
                            :href="item.link"
                            target="_blank"
                            :style="highLight(item.color)"
                            :key="i"
                        >
                            <i :class="item.icon"></i> {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
// import { getMenuGroups } from "@/service/helper.js";
import { getMenuGroup, getBread } from "@/service/helper.js";
export default {
    name: "list_side",
    props: [],
    data: function () {
        return {
            tab: ["rule","api"],
            rules: "",
            apis: [],
            qq: "297985102"
        };
    },
    computed: {
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        loadRules: function () {
            getBread("tool_rule").then((res) => {
                this.rules = res.data.data.html;
            });
        },
        loadApis: function () {
            getMenuGroup("tool_api").then((res) => {
                this.apis = res.data.data.menus || [];
            });
        },
        highLight: function (val) {
            if (val) {
                return "color:" + val + ";font-weight:bold;";
            }
            return "";
        },
        onQQClick() {
            navigator.clipboard.writeText(this.qq).then(() => {
                this.$notify({
                    title: "复制成功",
                    message: "内容：" + this.qq,
                    type: "success",
                });
            })
        }
    },
    mounted: function () {
        this.loadRules();
        this.loadApis();
    },
    components: {},
};
</script>

<style lang="less">
.m-tool-rule {
    .u-content {
        .fz(12px);
    }
}
.m-tool-api {
    .u-item {
        .db;
        padding:0 5px;
        .fz(12px,3);
        .x(left);
        border-bottom: 1px dashed #eee;
        &:last-child{
            border-bottom:none;
        }
        &:hover {
            color: @pink;
        }
        i {
            color: #666;
            .mr(3px);
        }
    }
}
.m-list-side {
    .u-link {
        .pointer;
    }
}
</style>
