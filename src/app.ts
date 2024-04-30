import express from "express";
import routes from "./routes/routes";

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
  })
);

app.use("/", routes);

if (require.main === module) {
  const port: number = parseInt(process.env.PORT as string, 10) || 3000;
  app.listen(port, (): void => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
