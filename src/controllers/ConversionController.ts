import { Request, Response } from "express";
import ConversionRequest from "../dto/ConversionRequest.dto";
import ConversionResponse from "../dto/ConversionResponse.dto";
import { convert, gradeResponse } from "../services/ConversionService";

import { GradeStatus } from "../models/ConversionTypes";

export const convertAndGradeUnits = async (req: Request, res: Response) => {
  const conversionReq: ConversionRequest = req.body;

  try {
    const convertedValue = convert(
      conversionReq.inputValue,
      conversionReq.inputUnit,
      conversionReq.targetUnit
    );
    let gradeStatus: GradeStatus | undefined;

    if (conversionReq.studentAnswer !== undefined) {
      const isCorrect = gradeResponse(
        convertedValue,
        Number(conversionReq.studentAnswer)
      );
      gradeStatus = isCorrect ? "correct" : "incorrect";
    }

    const response: ConversionResponse = {
      inputValue: conversionReq.inputValue,
      inputUnit: conversionReq.inputUnit,
      targetUnit: conversionReq.targetUnit,
      convertedValue,
      gradeStatus,
      status: "success",
    };

    res.json(response);
  } catch (error) {
    const errorResponse: ConversionResponse = {
      inputValue: conversionReq.inputValue,
      inputUnit: conversionReq.inputUnit,
      targetUnit: conversionReq.targetUnit,
      convertedValue: undefined,
      gradeStatus: "invalid",
      status: "error",
      errorMessage: "An error occurred during the conversion process.",
    };

    res.status(400).json(errorResponse);
  }
};
