import Vue from "vue";
import Vuex from "vuex";
import User from "@jx3box/jx3box-common/js/user";

Vue.use(Vuex);

let store = {
    state: {
        // client
        client: location.href.includes("origin") ? "origin" : "std",
        // post
        id: 0,
        user_id: 0,
        post: "",
        extend : {
            collection_data : '',
            directory : false,
        },
        stars: {
            buff: [],
            doodad: [],
            npc: [],
            skill: [],
        },
        isLogin: User.isLogin(),
    },
    mutations: {
        switchClient: function(state, val) {
            state.client = val || "std";
        },
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
