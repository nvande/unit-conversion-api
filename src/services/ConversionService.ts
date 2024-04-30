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

function gradeResponse(value: number, response: number): boolean {
  const roundedValue = Number(value.toFixed(1));
  const roundedResponse = Number(response.toFixed(1));

  return roundedValue === roundedResponse;
}

export { convert, gradeResponse };
