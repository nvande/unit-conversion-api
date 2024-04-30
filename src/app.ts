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
    origin: "http://localhost:3001", // Allow only this origin to access
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Ensure methods match what the frontend uses
    credentials: false, // Explicitly set credentials to false
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
