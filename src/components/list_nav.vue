<template>
    <div class="m-list-nav">

        <h5 class="u-title">分类导航</h5>
        <div class="m-nav-group m-tool-nav">
            <a v-for="(item,i) in menu" :href="typeLink(item.slug)" :key="i" :class="{on:item.slug == subtype}"><i :class="item.icon"></i><b>{{item.name}}</b><span>{{item.desc}}</span></a>
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
                    icon : 'el-icon-collection',
                    name : '玩法心得',
                    desc : 'Experience'
                },
                {
                    slug : 2,
                    icon : 'el-icon-setting',
                    name : '工具源码',
                    desc : 'Tool'
                },
                {
                    slug : 6,
                    icon : 'el-icon-unlock',
                    name : '技术教程',
                    desc : 'Tutorial'
                },
                {
                    slug : 5,
                    icon : 'el-icon-warning-outline',
                    name : '帮助文档',
                    desc : 'Help'
                },
                {
                    slug : 3,
                    icon : 'el-icon-paperclip',
                    name : '资源分享',
                    desc : 'Resource'
                },
                {
                    slug : 4,
                    icon : 'el-icon-headset',
                    name : '其它',
                    desc : 'Other'
                },
                {
                    slug : 7,
                    icon : 'el-icon-chat-line-square',
                    name : '讨论',
                    desc : 'Discuz'
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
