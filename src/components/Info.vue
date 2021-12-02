<template>
    <div class="m-info">
        <div class="m-info-notice">
            <!-- <span class="u-item" href="/macro/#/">🌈 全新工具版上线，合并帮助文档</span> -->
            <!-- <span class="u-item" href="/macro/#/">🌈 <span>即将上线</span> · 私人宏仓库</span> -->
            <!-- <span class="u-item" href="/macro/#/">✨ <span>即将上线</span> · 云端宏一键同步</span> -->
            <!-- <span class="u-item" href="/house/#/rank">⚽️ <span>即将上线</span> · 云端宏排行榜</span> -->
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-receiving"></i></router-link>
            <router-link to="/?subtype=1"><i class="el-icon-setting"></i></router-link>
            <router-link to="/?subtype=3"><i class="el-icon-discover"></i></router-link>
            <router-link to="/?subtype=2"><i class="el-icon-paperclip"></i></router-link>
            <router-link to="/?subtype=4"><i class="el-icon-collection"></i></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        subtype : function (){
            return this.$store.state.subtype
        },
        isIndex : function (){
            return !this.subtype
        }
    },
    methods: {
        isActive : function (subtype){
            return this.subtype == subtype
        }
    },
    mounted: function() {}
};
</script>

<style lang="less">
@import '../assets/css/info.less';
</style>
