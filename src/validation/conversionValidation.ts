import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { TemperatureUnit, VolumeUnit } from "../models/ConversionTypes";
import ConversionRequest from "../dto/ConversionRequest.dto";

const conversionSchema: Joi.ObjectSchema<ConversionRequest> = Joi.object({
  inputValue: Joi.number().required(),
  inputUnit: Joi.string()
    .valid(...Object.values(TemperatureUnit), ...Object.values(VolumeUnit))
    .required(),
  targetUnit: Joi.string()
    .valid(...Object.values(TemperatureUnit), ...Object.values(VolumeUnit))
    .required(),
  studentAnswer: Joi.alternatives(Joi.string(), Joi.number()).optional(),
});

export const validateConversionRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (Array.isArray(req.body)) {
    const results = req.body.map((request) => {
      const { error } = conversionSchema.validate(request);
      if (error) {
        return {
          status: "error",
          message: "Invalid request data",
          details: error.details.map((detail) => detail.message),
        };
      }
      return request;
    });

    const errors = results.filter((result) => result.status === "error");
    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    req.body = results;
    return next();
  }

  const { error } = conversionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: "error",
      message: "Invalid request data",
      details: error.details.map((detail) => detail.message),
    });
  }
  next();
};
