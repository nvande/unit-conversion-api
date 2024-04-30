import { Unit } from "../models/ConversionTypes";

export default interface ConversionRequest {
    numericalValue: number;
    inputUnit: Unit;
    targetUnit: Unit;
    studentResponse?: number;
}