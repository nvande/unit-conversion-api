import express, { Request, Response } from "express";

import { convertAndGradeUnits } from "../controllers/ConversionController";
import { validateConversionRequest } from "../validation/conversionValidation";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Unit Conversion API");
});

router.post("/convert", validateConversionRequest, convertAndGradeUnits);

export default router;
