import { TemperatureUnit, VolumeUnit } from "../models/ConversionTypes";

export const convertTemperature = (
  value: number,
  fromUnit: TemperatureUnit,
  toUnit: TemperatureUnit
): number => {
  let celsius: number;

  switch (fromUnit) {
    case TemperatureUnit.Fahrenheit:
      celsius = (value - 32) * (5 / 9);
      break;
    case TemperatureUnit.Kelvin:
      celsius = value - 273.15;
      break;
    case TemperatureUnit.Rankine:
      celsius = (value - 491.67) * (5 / 9);
      break;
    case TemperatureUnit.Celsius:
      celsius = value;
      break;
    default:
      throw new Error(`Unsupported temperature unit: ${fromUnit}`);
  }

  switch (toUnit) {
    case TemperatureUnit.Fahrenheit:
      return celsius * (9 / 5) + 32;
    case TemperatureUnit.Kelvin:
      return celsius + 273.15;
    case TemperatureUnit.Rankine:
      return (celsius + 273.15) * (9 / 5);
    case TemperatureUnit.Celsius:
      return celsius;
    default:
      throw new Error(`Unsupported temperature unit: ${toUnit}`);
  }
};

export const convertVolume = (
  value: number,
  fromUnit: VolumeUnit,
  toUnit: VolumeUnit
): number => {
  let liters: number;

  switch (fromUnit) {
    case VolumeUnit.Tablespoons:
      liters = value * 0.0147867648;
      break;
    case VolumeUnit.CubicInches:
      liters = value * 0.016387064;
      break;
    case VolumeUnit.Cups:
      liters = value * 0.236588237;
      break;
    case VolumeUnit.CubicFeet:
      liters = value * 28.3168466;
      break;
    case VolumeUnit.Gallons:
      liters = value * 3.78541178;
      break;
    case VolumeUnit.Liters:
      liters = value;
      break;
    default:
      throw new Error(`Unsupported volume unit: ${fromUnit}`);
  }

  switch (toUnit) {
    case VolumeUnit.Tablespoons:
      return liters / 0.0147867648;
    case VolumeUnit.CubicInches:
      return liters / 0.016387064;
    case VolumeUnit.Cups:
      return liters / 0.236588237;
    case VolumeUnit.CubicFeet:
      return liters / 28.3168466;
    case VolumeUnit.Gallons:
      return liters / 3.78541178;
    case VolumeUnit.Liters:
      return liters;
    default:
      throw new Error(`Unsupported volume unit: ${toUnit}`);
  }
};
