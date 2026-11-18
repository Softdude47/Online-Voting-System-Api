import "dotenv/config";
import express, { json } from "express";
import userRouter from "./routes/user.routes.js";
import partyRouter from "./routes/party.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);
app.use("/party", partyRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
