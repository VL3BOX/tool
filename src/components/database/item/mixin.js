import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { starCancel, star } from "@/service/cms";
import JX3BOX from "@jx3box/jx3box-common/data/jx3box.json";
import { mapState } from "vuex";
const { __Root, __OriginRoot } = JX3BOX;

export default {
    props: {
        type: String,
        data: Object,
        hasRight: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        showDetail: false,
        staring: false,
    }),
    computed: {
        ...mapState(["isLogin"]),
        id_key() {
            const map = {
                buff: "BuffID",
                skill: "SkillID",
                doodad: "ID",
                npc: "ID",
            };
            return map[this.type];
        },
        star_id() {
            if (!this.isLogin) return false;
            const list = this.$store.state.stars[this.type];
            const item = list.find((i) => {
                if (
                    ["skill", "buff"].includes(this.type) &&
                    this.data.Level !== undefined &&
                    this.data.Level !== null
                ) {
                    return i.id === this.data[this.id_key] && i.level === this.data.Level;
                } else {
                    return i.id === this.data[this.id_key];
                }
            });
            if (!item) return null;
            return item.star_id;
        },
    },
    methods: {
        iconLink,
        toggleDetail() {
            this.showDetail = !this.showDetail;
        },
        copy(propName) {
            navigator.clipboard
                .writeText(this.data[propName])
                .then(() => {
                    this.$message({
                        message: "已复制ID",
                        type: "success",
                    });
                })
                .catch(() => {
                    this.$message({
                        message: "复制失败",
                        type: "error",
                    });
                });
        },
        filterRaw: function (str) {
            str = str && str.replace(/\\n/g, "\n");
            str = str && str.replace(/(\<TALENT.*?\>)/g, "\n$1");
            str = str && str.replace(/(\<EnchantID.*?\>)/g, "\n$1");
            return str;
        },
        // 收藏/取消收藏
        star(type, id, level) {
            if (this.staring) return;
            const data = {
                type,
                id,
            };
            if (level !== undefined && level !== null) data.level = level;
            this.staring = true;
            star(data)
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 0) {
                        data.name = this.data.Name || this.data.SkillName || this.data.BuffName;
                        data.remark = this.data.Remark;
                        data.icon = this.type === "doodad" ? 10909 : this.data.IconID;
                        data.desc = this.data.Desc;

                        this.$store.state.stars[type].push(data);
                    }
                })
                .finally(() => {
                    this.staring = false;
                });
        },
        cancelStar() {
            if (!this.star_id || this.staring) return;
            this.staring = true;
            starCancel(this.star_id)
                .then((res) => {
                    const { code, msg } = res.data;
                    if (code === 0) {
                        this.$store.state.stars[this.type] = this.$store.state.stars[this.type].filter(
                            (item) => item.star_id !== this.star_id
                        );
                    } else {
                        this.$message({
                            message: msg,
                            type: "error",
                        });
                    }
                })
                .finally(() => {
                    this.staring = false;
                });
        },
        // 跳转到DBM新建元数据
        toDbm(type, id, level) {
            const typeMap = {
                doodad: "DOODAD",
                npc: "NPC",
                buff: "BUFF",
                skill: "CASTING",
            };
            const client = this.$store.state.client;
            const root = client === "std" ? __Root : __OriginRoot;
            const url = new URL(`${root}dbm/item/create`);
            url.searchParams.append("type", typeMap[type] || type);
            url.searchParams.append("id", id);
            url.searchParams.append("level", level);
            window.open(url.href, "_blank");
        },
    },
};
