<template>
    <div class="m-icons">
        <h1 class="m-icons-title">剑三图标库</h1>
        <div class="m-icons-box">
            <el-tabs v-model="activeTabName" type="card">
                <el-tab-pane label="图标库" name="list">
                    <IconsSearch />
                </el-tab-pane>
                <el-tab-pane label="收藏图标" name="favicon">
                    <IconsFav />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import IconsSearch from "./search.vue";
import IconsFav from "./fav.vue";
export default {
    name: "icons",
    props: [],
    components: {
        IconsSearch,
        IconsFav,
    },
    data: function () {
        return {
            activeTabName: "list",
        };
    },
    computed: {},
    methods: {},
};
</script>
