export default {
    fetch(request, env, ctx) {
        const url = new URL(request.url);

        if (request.method === "GET" && url.pathname.startsWith("/api/token"))
            return new Response("ok!", { status: 200 });

        if (request.method === "POST" && url.pathname.startsWith("/api/memes"))
            return new Response("ok!", { status: 200 });

        return new Response(null, { status: 400 });
    },
};