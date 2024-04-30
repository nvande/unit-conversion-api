import { Unit, ResponseStatus, Status } from "../models/ConversionTypes";

export default interface ConversionResult {
    originalValue: number;
    inputUnit: Unit;
    targetUnit: Unit;
    convertedValue: number;
    responseStatus?: ResponseStatus;
    status: Status;
    errorMessage?: string;
}