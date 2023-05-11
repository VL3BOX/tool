import { $cms } from "@jx3box/jx3box-common/js/https";

export const star = async (data) => $cms().post(`/api/cms/app/database/star`, data);

export const starCancel = async (id) => $cms().delete(`/api/cms/app/database/star/${id}`);

export const starList = async (type) => $cms().get(`/api/cms/app/database/star/${type}`);
