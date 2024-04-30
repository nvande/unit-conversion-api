import { Unit, TemperatureUnit, VolumeUnit } from "../models/ConversionTypes";
import { convertTemperature, convertVolume } from "../utils/conversionUtils";

function isTemperatureUnit(unit: Unit): unit is TemperatureUnit {
  return Object.values(TemperatureUnit).includes(unit as TemperatureUnit);
}

function isVolumeUnit(unit: Unit): unit is VolumeUnit {
  return Object.values(VolumeUnit).includes(unit as VolumeUnit);
}

function convert(value: number, inputUnit: Unit, targetUnit: Unit): number {
  if (isTemperatureUnit(inputUnit) && isTemperatureUnit(targetUnit)) {
    return convertTemperature(value, inputUnit, targetUnit);
  } else if (isVolumeUnit(inputUnit) && isVolumeUnit(targetUnit)) {
    return convertVolume(value, inputUnit, targetUnit);
  }
  throw new Error("Unsupported or mismatched unit conversion types");
}

function gradeAnswer(value: number, answer: number): boolean {
  const roundedValue = toTenths(value);
  const roundedAnswer = toTenths(answer);

  return roundedValue === roundedAnswer;
}

function toTenths(value: number): number {
    return Math.round(10*value)/10;  
}

export { convert, gradeAnswer };
