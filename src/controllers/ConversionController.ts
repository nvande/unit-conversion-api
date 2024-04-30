import { Request, Response } from "express";
import ConversionRequest from "../dto/ConversionRequest.dto";
import ConversionResponse from "../dto/ConversionResponse.dto";
import { convert, gradeAnswer } from "../services/ConversionService";
import { GradeStatus } from "../models/ConversionTypes";

function isNumeric(n: string) {
  return !isNaN(Number(n));
}

export const convertAndGradeUnits = async (req: Request, res: Response) => {
  const processConversion = (
    conversionReq: ConversionRequest
  ): ConversionResponse => {
    try {
      const convertedValue = convert(
        conversionReq.inputValue,
        conversionReq.inputUnit,
        conversionReq.targetUnit
      );
      let gradeStatus: GradeStatus | undefined;

      if (conversionReq.studentAnswer !== undefined) {
        if (isNumeric(conversionReq.studentAnswer.toString())) {
          const isCorrect = gradeAnswer(
            convertedValue,
            Number(conversionReq.studentAnswer)
          );
          gradeStatus = isCorrect ? "correct" : "incorrect";
        } else {
          gradeStatus = "invalid";
        }
      }

      return {
        inputValue: conversionReq.inputValue,
        inputUnit: conversionReq.inputUnit,
        targetUnit: conversionReq.targetUnit,
        convertedValue,
        gradeStatus,
        status: "success",
      };
    } catch (error) {
      return {
        inputValue: conversionReq.inputValue,
        inputUnit: conversionReq.inputUnit,
        targetUnit: conversionReq.targetUnit,
        convertedValue: undefined,
        gradeStatus: "invalid",
        status: "error",
        errorMessage: "An error occurred during the conversion process.",
      };
    }
  };

  if (Array.isArray(req.body)) {
    const responses = req.body.map(processConversion);
    res.json(responses);
  } else {
    const response = processConversion(req.body);
    res.json(response);
  }
};
