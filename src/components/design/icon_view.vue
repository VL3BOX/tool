<template>
    <div class="m-icons-view">
        <el-input placeholder="输入搜索条件" v-model="search" class="input-with-select" clearable @keyup.enter.native="onSearch">
            <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
        </el-input>

        <div class="m-icons-matrix__view m-icons-matrix" v-loading="loading">
            <el-popover v-for="(icon, index) in icons" :key="index" trigger="hover" placement="top" popper-class="m-icon-pop" :visible-arrow="false">
                <div class="m-icon-content">
                    <div class="m-icon-content__top">
                        <el-image :src="iconLink(icon.ID)" class="u-icon" alt="" @error="(e) => onIconError(e, icon.ID)"></el-image>
                        <span class="u-id">ID: {{ icon.ID }}</span>
                    </div>
                    <div class="m-icon-content__bottom">
                        <div class="m-icon-content-item">
                            <span class="u-label">类别<small>Kind</small></span>
                            <span class="u-val">{{ icon.Kind }}</span>
                        </div>
                        <div class="m-icon-content-item">
                            <span class="u-label">子类别<small>SubKind</small></span>
                            <span class="u-val">{{ icon.SubKind }}</span>
                        </div>
                        <div class="m-icon-content-item" v-if="icon.Tag1 || icon.Tag2">
                            <span class="u-label">标签<small>Tag</small></span>
                            <span class="u-val">{{ iconTag(icon) }}</span>
                        </div>
                        <div class="m-icon-content-item">
                            <span class="u-label">文件<small>FileName</small></span>
                            <span class="u-val">{{ icon.FileName }}</span>
                        </div>
                    </div>
                </div>
                <icon-item slot="reference" :icon="icon.ID" :isFav="false"></icon-item>
            </el-popover>
        </div>
        <el-pagination
            class="u-pagination"
            background
            layout="prev, pager, next,jumper"
            :total="total"
            :page-size="per"
            :current-page.sync="page"
            hide-on-single-page
        >
        </el-pagination>
    </div>
</template>

<script>
import iconItem from "./item.vue";
import {getIcons} from "@/service/icons.js";
import { iconLink } from "@jx3box/jx3box-common/js/utils.js";
export default {
    name: "icons-view",
    components: {
        iconItem,
    },
    data() {
        return {
            icons: [],
            per: 144,
            page: 1,
            total: 0,
            search: "",
            loading: false,
        };
    },
    computed: {
        params() {
            return {
                per: this.per,
                page: this.page,
                client: this.client
            };
        },
        client() {
            return this.$store.state.client;
        },
    },
    watch: {
        params: {
            handler() {
                this.loadData();
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        onSearch() {
            if (this.page != 1) {
                this.page =1
            } else {
                this.loadData()
            }
        },
        loadData() {
            this.loading = true;
            const params = {
                ...this.params,
                search: this.search,
            };
            getIcons(params).then((res) => {
                this.icons = res.data.list || [];
                this.total = res.data.total;
            }).finally(() => {
                this.loading = false;
            });
        },
        iconLink(id, client=this.client) {
            return iconLink(id, client);
        },
        iconTag({ Tag1, Tag2 }) {
            return [Tag1, Tag2].filter((i) => i).join("、");
        },
        onIconError(e, id) {
            e.target.src = this.iconLink(id, "std");
        },
    },
}
</script>

<style lang="less">
.m-icons-view {
    .u-pagination {
        .x;
        margin-top: 20px;
        max-width: 100%;
        overflow-x: auto;
    }
}
.m-icons-matrix__view {
    display: grid !important;
    grid-template-columns: repeat(18, 1fr);

    .u-icons-item {
        .flex;
        flex-direction: column;
        align-items: center;
    }
}

.m-icon-pop{
    padding: 1px !important;
    border: 1px solid #68817e !important;
    background: none !important;
    border-radius: 0 !important;

    .m-icon-content {
        background: rgba(0,0,0,.8);
        color: #fff;
        padding: 10px;
    }

    .u-id {
        margin-left: 10px;
        color: #ff0;
    }

    .u-label {
        .dbi;
        &::after {
            content: "：";
        }

        small::before {
            content: "（";
        }

        small::after {
            content: "）";
        }
    }

    .u-val {
        color: #ff0;
    }
}
</style>
