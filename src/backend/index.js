import { getMemeCount, increaseMemeCount } from "./DatabaseManager.js";

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const DB = env.MEMEFY_DB;

        if (request.method === "GET" && url.pathname.startsWith("/api/token"))
            return new Response(null, { status: 200 });

        if (request.method === "GET" && url.pathname.startsWith("/api/memes")) {
            const count = await getMemeCount(DB);

            return new Response(JSON.stringify({ memeCount: count }), { status: 200 });
        }

        if (request.method === "POST" && url.pathname.startsWith("/api/memes")) {
            ctx.waitUntil(increaseMemeCount(DB));

            return new Response(null, { status: 200 });
        }

        return new Response(null, { status: 400 });
    },
};