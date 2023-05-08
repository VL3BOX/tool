import { $node } from "@jx3box/jx3box-common/js/https";

const $ = $node();

export const getStat = async (client) => $.get(`/`, { params: { client } });
