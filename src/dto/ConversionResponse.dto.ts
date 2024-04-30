import { Unit, GradeStatus, ResponseStatus } from "../models/ConversionTypes";

export default interface ConversionResponse {
  inputValue: number;
  inputUnit: Unit;
  targetUnit: Unit;
  convertedValue?: number;
  studentAnswer?: number;
  gradeStatus?: GradeStatus;
  status: ResponseStatus;
  errorMessage?: string;
}
