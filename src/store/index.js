import Vue from "vue";
import Vuex from "vuex";
import User from "@jx3box/jx3box-common/js/user";
import { $img } from "@/service/oss";

Vue.use(Vuex);

let store = {
    state: {
        // common
        client: location.href.includes("origin") ? "origin" : "std",
        isLogin: User.isLogin(),
        mapIndex: {},
        mapKeys: [],

        // post
        id: 0,
        user_id: 0,
        post: "",
        extend: {
            collection_data: "",
            directory: false,
        },

        // icons
        favList: [],

        // database versions
        database_client: location.href.includes("origin") ? "origin" : "std",
        database_type: "buff",
        database_ref_count: { buff: [], skill: [], doodad: [], npc: [] },
        database_stat: {
            version: "",
            count: "",
        },

        stars: {
            buff: [],
            doodad: [],
            npc: [],
            skill: [],
        },
    },
    mutations: {
        switchClient: function (state, val) {
            state.client = val || "std";
        },
        storeFav(state, list) {
            state.favList = list;
        },
    },
    getters: {},
    actions: {
        getMapIndex: function ({ state }) {
            $img.get("/map/data/map_index.json").then((res) => {
                const mapIndex = res.data;
                state.mapIndex = { ...mapIndex, ...state.mapIndex };
                state.mapKeys = Object.keys(state.mapIndex)
                    .map(Number)
                    .sort((a, b) => a - b);
            });
        },
    },
    modules: {},
};

export default new Vuex.Store(store);
