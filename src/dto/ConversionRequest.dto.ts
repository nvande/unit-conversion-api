import { Unit } from "../models/ConversionTypes";

export default interface ConversionRequest {
  inputValue: number;
  inputUnit: Unit;
  targetUnit: Unit;
  studentAnswer?: number;
}
