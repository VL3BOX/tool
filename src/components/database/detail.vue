<template>
    <div class="m-database-detail">
        <div class="u-top-bar">
            <el-button @click="goBack" icon="el-icon-arrow-left" plain>返回</el-button>
            <div class="m-detail-title">{{ type.toUpperCase() }} - {{ title }}</div>
        </div>
        <component
            :is="item_component[type]"
            :showDetail="true"
            :data="data"
            :hasRight="hasRight"
            :type="type"
        ></component>
        <!-- 评论组件 -->
        <el-divider content-position="left"><i class="el-icon-chat-line-square"></i> 评论</el-divider>
        <Comment class="m-comment" :id="id" :category="type" />
    </div>
</template>

<script>
import { mapState } from "vuex";

import ItemBuff from "@/components/database/item/buff.vue";
import ItemSkill from "@/components/database/item/skill.vue";
import ItemNpc from "@/components/database/item/npc.vue";
import ItemDoodad from "@/components/database/item/doodad.vue";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";

export default {
    name: "DatabaseDetail",
    components : {
        Comment,
    },
    props: {
        data: Object,
        hasRight: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState({
            client: (state) => state.database_client,
            type: (state) => state.database_type,
        }),
        title() {
            const item = this.data;
            let title = item.Name || item.BuffName || item.SkillName || item.Remark;
            if (title) return title;
            let id = item.ID || item.SkillID || item.BuffID;
            return `(${id})`;
        },
        id(){
            const item = this.data;
            let id = item.ID || item.SkillID || item.BuffID;
            return id;
        }
    },
    data: () => ({
        item_component: {
            buff: ItemBuff,
            skill: ItemSkill,
            npc: ItemNpc,
            doodad: ItemDoodad,
        },
    }),
    mounted() {},
    methods: {
        goBack() {
            let query = { type: this.type };
            this.$router.replace({ query }).catch(() => {});
            this.$emit("update:data", "");
        },
    },
};
</script>

<style lang="less" scoped>
.m-database-detail {
    .m-detail-title {
        .fz(14px, 1.2);
    }
    .u-top-bar {
        display: flex;
        align-items: center;
        gap: 20px;
        .mb(20px);
    }
}
</style>
