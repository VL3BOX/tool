<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>工具作者交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=ZAsOkzUq">297985102</a>
            </strong>
        </RightSideMsg>

        <div class="m-placeholder">
            🧸 新版主说她还不知道放什么
        </div>
    </div>
</template>

<script>
import { getMenuGroups } from "@/service/helper.js";
export default {
    name: "list_side",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
        client: function() {
            return this.$store.state.client;
        },
    },
    methods: {},
    mounted: function() {
        // getMenuGroups(["macro_newbie", "macro_senior", "macro_tools"]).then((res) => {
        //     let data = res.data.data.data || {};
        //     for (let key in data) {
        //         this[key] = data[key]["menus"];
        //     }
        // });
    },
    components: {
    },
};
</script>

<style lang="less">
.m-placeholder{
    .fz(12px);
    color:#999;
    padding:50px 0;
    .x;
}
</style>
