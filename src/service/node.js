import { $node } from "@jx3box/jx3box-common/js/https";

const $ = $node();

export const getStat = async (client) => $.get(`/`, { params: { client } });

export const getResource = async (type, condition, query, params) =>
    $.get(`/${type}/${condition}/${query}`, { params });
