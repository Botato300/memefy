import express from "express";

import { ENV_VARS } from "./config.js";
import databaseService from "./services/databaseService.js";
import memesController from "./controllers/memesController.js";

await databaseService.init();

const app = express();
app.use(express.json());
app.set("trust proxy", true);

app.disable("x-powered-by");

app.get("/api/memes", memesController.getCount);
app.post("/api/memes", memesController.increaseCount);

app.listen(ENV_VARS.PORT, () => {
    console.log(`Running on http://${ENV_VARS.IP}:${ENV_VARS.PORT} in mode ${process.env.NODE_ENV}`);
});
