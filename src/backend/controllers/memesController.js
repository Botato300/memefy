import databaseService from "../services/databaseService.js";

const KEY_COUNT = "memeCount";

export default class memeController {
    static async increaseCount(req, res) {
        try {
            const currentCount = await queryGetCount();

            await databaseService.set(KEY_COUNT, currentCount + 1);

            res.sendStatus(200);
        } catch (error) {
            console.error("Error en memeController.increaseCount():\n" + error);
            res.sendStatus(500);
        }
    }

    static async getCount(req, res) {
        try {
            const memeCount = await queryGetCount();

            res.status(200).send({ memeCount });
        } catch (error) {
            console.error("Error en memeController.getCount():\n" + error);
            res.sendStatus(500);
        }
    }
}

async function queryGetCount() {
    const count = parseInt(await databaseService.get(KEY_COUNT));
    return count;
}