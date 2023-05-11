import { $node, axios } from "@jx3box/jx3box-common/js/https";

const $ = $node();
// const $ = axios.create({
//     baseURL: "http://localhost:7002",
// });

export const getStat = async (client) => $.get(`/`, { params: { client } });

export const getResource = async (type, condition, query, params) =>
    $.get(`/${type}/${condition}/${query}`, { params });

export const getNewest = async (type, params) => $.get(`/${type}/newest`, { params });
