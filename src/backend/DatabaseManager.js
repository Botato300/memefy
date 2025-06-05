const KEY_MEME_COUNT = "meme_count";

export async function getMemeCount(db) {
    const count = await db.get(KEY_MEME_COUNT);

    if (!count)
        return 0;


    return parseInt(count);
}

export async function increaseMemeCount(db) {
    const oldValue = await getMemeCount(db);

    return db.put(KEY_MEME_COUNT, oldValue + 1);
}