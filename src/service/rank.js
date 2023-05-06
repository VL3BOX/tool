import { $next } from "@jx3box/jx3box-common/js/https";

function getRank(client, limit = 10) {
    return $next()
        .get("api/plugins/jx3dat/rank", {
            params: {
                pageSize: limit,
                client,
            },
        })
        .then((res) => {
            return res.data;
        });
}

function getHistory(uid) {
    return $next()
        .get("api/plugins/" + uid + "/dbm/list")
        .then((res) => {
            return res.data;
        });
}

export { getRank, getHistory };
