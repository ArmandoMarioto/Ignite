import express from "express";
import swaggerUI from "swagger-ui-express";

import { router } from "./routes";
import swaggerFiles from "./swagger.json";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFiles));

app.use(router);

app.listen(3333, () => console.log("Server listening on"));
