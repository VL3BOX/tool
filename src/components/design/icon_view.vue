<template>
    <div class="m-icons-view">
        <el-input placeholder="输入搜索条件" v-model="search" class="input-with-select" @keyup.enter.native="onSearch">
            <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
        </el-input>

        <div class="m-icons-matrix" v-if="icons.length>0">
            <icon-item v-for="(icon, index) in icons" :icon="icon.ID" :isFav="false" :key="index"></icon-item>
        </div>
        <el-pagination
            class="u-pagination"
            background
            layout="prev, pager, next"
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
        };
    },
    computed: {
        params() {
            return {
                per: this.per,
                page: this.page,
                search: this.search,
            };
        }
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
        loadData() {
            getIcons(this.params).then((res) => {
                this.icons = res.data.list || [];
                this.total = res.data.total;
            });
        },
        onSearch() {},
    },
}
</script>

<style lang="less"></style>
