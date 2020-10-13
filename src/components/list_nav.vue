<template>
    <div class="m-list-nav">

        <RightSideMsg>
            <em>工具作者交流群</em> :
            <strong><a href="https://jq.qq.com/?_wv=1027&k=Bfj4wm5E">297985102</a></strong>
        </RightSideMsg>

        <h5 class="u-title">分类导航</h5>
        <div class="m-nav-group m-tool-nav">
            <a v-for="(item,i) in menu" :href="typeLink(item.slug)" :key="i" :class="{on:item.slug == subtype}"><i :class="item.icon"></i><b>{{item.name}}</b><span>{{item.desc}}</span></a>
            <!-- <a href=""><i class="el-icon-menu"></i><span>站内应用</span></a> -->
        </div>

        <!-- <h5 class="u-title">推荐作品</h5>
        <div class="m-nav-group">
            <router-link to="/furniture">
                <img svg-inline src="../assets/img/logo.svg" />
                <span>家具图鉴</span>
            </router-link>
        </div> -->
    </div>
</template>

<script>
export default {
    name: "list_nav",
    props: [],
    data: function() {
        return {
            menu : [
                {
                    slug : '',
                    icon : 'el-icon-receiving',
                    name : '全部',
                    desc : 'All'
                },
                {
                    slug : 1,
                    icon : 'el-icon-setting',
                    name : '工具源码',
                    desc : 'Tool'
                },
                {
                    slug : 2,
                    icon : 'el-icon-paperclip',
                    name : '资源分享',
                    desc : 'Resource'
                },
                {
                    slug : 3,
                    icon : 'el-icon-collection',
                    name : '插件指南',
                    desc : 'Usage'
                },
                {
                    slug : 4,
                    icon : 'el-icon-warning-outline',
                    name : '帮助文档',
                    desc : 'Help'
                },
            ]
        };
    },
    computed: {
        subtype : function (){
            return this.$store.state.subtype || ''
        }
    },
    methods: {
        typeLink : function (subtype){
            return './?subtype=' + subtype
        }
    },
    mounted: function() {
        // console.log(this.$store.state.subtype)
    },
    components : {
        
    }
};
</script>
