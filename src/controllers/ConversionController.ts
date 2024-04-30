// src/controllers/conversionController.ts
import { Request, Response } from 'express';
import ConversionRequest from '../dto/ConversionRequest.dto';

export const convertAndGradeUnits = async (req: Request, res: Response) => {
    const conversionReq: ConversionRequest = req.body;

    try {
        const convertedValue = conversionService.convert(conversionReq.numericalValue, conversionReq.inputUnit, conversionReq.targetUnit);
        let isCorrect: boolean | undefined;

        if (conversionReq.studentResponse !== undefined) {
            isCorrect = conversionService.validateResponse(convertedValue, conversionReq.studentResponse);
        }

        res.json({
            originalValue: conversionReq.numericalValue,
            inputUnit: conversionReq.inputUnit,
            targetUnit: conversionReq.targetUnit,
            convertedValue: convertedValue,
            isCorrect: isCorrect
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
