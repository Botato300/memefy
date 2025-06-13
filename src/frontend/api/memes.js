export async function getMemeCount() {
    try {
        const response = await fetch("/api/memes");

        if (!response.ok)
            throw "The API returned an HTTP code other than 200.";

        const content = await response.json();

        return content.memeCount;
    } catch (error) {
        console.error(`An error occurred while obtaining the meme count in the API:\n${error}`);
        throw error;
    }
}

export async function increaseMemeCount() {
    try {
        const response = await fetch("/api/memes", { method: "POST" });

        if (!response.ok)
            throw "The API returned an HTTP code other than 200.";
    } catch (error) {
        console.error(`An error occurred when incrementing the meme count in the API:\n${error}`);
    }
}

