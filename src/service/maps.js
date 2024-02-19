import { $node, axios } from "@jx3box/jx3box-common/js/https";

const $ = $node();

export const getMaps = async (params) => $.get(`/map`, { params });
export const getMapsPoint = async (params) => $.get(`/map/map-point`, { params });
export const getMapsIdPoint = async (params) => $.get(`/map/id-to-point`, { params });
export const getMapsTraffic = async (params) => $.get(`/map/traffic-line`, { params });