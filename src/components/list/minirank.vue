<template>
    <div class="m-jx3dat-rank-mini m-jx3dat-rank">
        <h3 class="c-sidebar-right-title">
            <img class="u-icon" svg-inline src="../../assets/img/rank.svg" />排行榜
            <span class="u-more" @click="viewRank">查看更多 &raquo;</span>
        </h3>
        <ul class="u-list">
            <li v-for="(item, j) in data" :key="j">
                <a class="u-link" :href="item.pid | postLink">
                    <span class="u-order" :class="highlight(j)">{{ j + 1 }}</span>
                    <span class="u-name">
                        {{ item.author }}
                        <span v-if="item.v != '默认版'">#{{ item.v }}</span>
                    </span>
                    <span class="u-per">
                        <em class="u-count">+ {{ item["7days"] }}</em>
                        <!-- <i
                        class="el-icon-top u-trending"
                        v-if="trending(item) > 0"
                        >{{ (trending(item) * 100).toFixed(2) + "%" }}</i
                    >
                    <i
                        class="el-icon-bottom u-trending"
                        v-if="trending(item) < 0"
                        >{{ (trending(item) * 100).toFixed(2) + "%" }}</i
                    >
                    <span
                        class="u-trending u-trending-keep"
                        v-if="trending(item) == 0"
                        >-</span
                        >-->
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { getRank } from "../../service/rank";
import { postLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "rank",
    data: function() {
        return {
            data: [],
        };
    },
    computed: {
        client: function() {
            return this.$store.state.client;
        },
    },
    methods: {
        trending: function(item) {
            let trending_1 = (item.before3 - item.before2) / item.before2;
            let trending_2 = (item.before2 - item.yesterday) / item.yesterday;
            let average = (trending_1 + trending_2) / 2;
            return isNaN(average) ? "N/A" : average.toFixed(4);
        },
        viewRank: function() {
            this.$router.push({ name: "jx3dat_rank" });
        },
        highlight: function(i) {
            if (i == 0) {
                return "t1";
            } else if (i == 1) {
                return "t2";
            } else if (i == 2) {
                return "t3";
            }
        },
    },
    filters: {
        postLink: function(pid) {
            return postLink("jx3dat", pid);
        },
    },
    mounted: function() {
        getRank(this.client, 10).then((data) => {
            let _data = [];
            for (let [i, item] of data.entries()) {
                if (item["7days"]) {
                    _data.push(item);
                }
            }
            _data = _data
                .sort((old, now) => {
                    return now["7days"] - old["7days"];
                })
                .slice(0, 10);
            this.data = _data;
        });
    },
    components: {},
};
</script>

<style lang="less">
@import "../../assets/css/rank.less";
</style>
