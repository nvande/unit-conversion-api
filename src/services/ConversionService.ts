import { ResponseStatus, Unit } from "../models/ConversionTypes";

const { convertVolume, convertTemperature } = require("../utils/conversionUtils");

function convert(value: number, inputUnit: string, targetUnit: Unit): number {
    
}

function convertTemperature(value: number, inputUnit: Unit, targetUnit: Unit): number {



    return value;
}

function convertVolume(value: number, inputUnit: Unit, targetUnit: Unit): number {



    return value;
}

function gradeResponse(numericalValue: number, inputUnit: Unit, targetUnit: string, studentResponse: number): ResponseStatus {

    const convertedValue = 

    return parseFloat(convertedValue.toFixed(1)) === parseFloat(studentResponse.toFixed(1));
}

export { convert, convertTemperature, convertVolume, gradeResponse };
