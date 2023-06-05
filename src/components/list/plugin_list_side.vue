<template>
    <div class="m-extend-list">
        <RightSideMsg>
            <em>团控数据作者交流群</em> :
            <strong @click="onQQClick" class="u-link" title="点击复制">
                <a>{{ qq }}</a>
            </strong>
        </RightSideMsg>
        <minirank />
        <!-- 其他链接 -->
        <div class="m-jx3dat-links m-side-links">
            <h3 class="m-side-title" style="border-bottom: none;">
                <div class="u-title">
                    <img class="u-icon" svg-inline src="@/assets/img/side/docs.svg" />
                    帮助文档
                </div>
            </h3>
            <el-collapse class="u-groups" v-model="activeDocGroup">
                <el-collapse-item title="入门帮助" name="newbie">
                    <div class="u-docs">
                        <a v-for="(item, i) in jx3dat_newbie" :key="i" class="u-doc" :href="item.link" target="_blank">
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="发布指南" name="senior">
                    <div class="u-docs">
                        <a v-for="(item, i) in jx3dat_senior" :key="i" class="u-doc" :href="item.link" target="_blank">
                            <i class="el-icon-collection"></i>
                            {{ item.label }}
                        </a>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <!-- <Github_REPO REPO="fb" coder="8"></Github_REPO> -->
    </div>
</template>

<script>
import minirank from "./minirank.vue";
import { getMenuGroups } from "@/service/helper.js";
export default {
    name: "list_side",
    props: [],
    data: function () {
        return {
            activeDocGroup: [],
            jx3dat_newbie: [],
            jx3dat_senior: [],

            qq: "608303480",
        };
    },
    computed: {},
    methods: {
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
        getMenuGroups(["jx3dat_newbie", "jx3dat_senior"]).then((res) => {
            let data = res.data.data.data || {};
            for (let key in data) {
                this[key] = data[key]["menus"];
            }
        });
    },
    components: {
        minirank,
    },
};
</script>

<style lang="less">

.m-side-title{
    margin:20px 0 10px 0;
}

.m-extend-list {
    .u-link {
        .pointer;
    }
}

.m-side-links {

    .u-title{
        .flex;
        align-items: center;
        gap:10px;
        .fz(18px);
    }

    .u-icon {
        .size(20px);
    }

    .u-groups {
        padding: 0 5px;
    }
    .u-doc {
        .nobreak;
        .flex;
        align-items: center;
        .fz(12px, 34px);
        // border-bottom: 1px solid #eee;
        i {
            .fz(16px);
            color: #666;
            .mr(5px);
        }
        &:last-child {
            border-bottom: none;
        }
        &:hover {
            .bold;
            color: @pink;
        }
    }
}

@media screen and (max-width: @phone) {
    .m-side-rank,
    .m-side-links {
        .none;
    }
}

.c-sidebar-right-list {
    .u-item {
        i {
            .mr(5px);
        }
    }
}

.c-sidebar-right-title {
    font-weight: bold;
}
</style>
