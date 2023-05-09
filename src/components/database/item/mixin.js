import { iconLink } from "@jx3box/jx3box-common/js/utils";

export default {
    props: {
        data: Object,
        hasRight: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        showDetail: false,
    }),
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
    },
};
