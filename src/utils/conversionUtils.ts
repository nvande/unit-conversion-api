/**
 * Converts temperatures between Kelvin, Celsius, Fahrenheit, and Rankine.
 * @param {number} value - The temperature value to convert.
 * @param {string} fromUnit - The unit of the input temperature.
 * @param {string} toUnit - The unit for the output temperature.
 * @return {number} - The converted temperature value.
 */
export const convertTemperature = (
  value: number,
  fromUnit: string,
  toUnit: string
): number => {
  let celsius: number;

  switch (fromUnit) {
    case "fahrenheit":
      celsius = (value - 32) * (5 / 9);
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
    case "rankine":
      celsius = (value - 491.67) * (5 / 9);
      break;
    case "celsius":
      celsius = value;
      break;
    default:
      throw new Error(`Unsupported temperature unit: ${fromUnit}`);
  }

  switch (toUnit) {
    case "fahrenheit":
      return celsius * (9 / 5) + 32;
    case "kelvin":
      return celsius + 273.15;
    case "rankine":
      return (celsius + 273.15) * (9 / 5);
    case "celsius":
      return celsius;
    default:
      throw new Error(`Unsupported temperature unit: ${toUnit}`);
  }
};

/**
 * Converts volumes between liters, tablespoons, cubic-inches, cups, cubic-feet, and gallons.
 * @param {number} value - The volume value to convert.
 * @param {string} fromUnit - The unit of the input volume.
 * @param {string} toUnit - The unit for the output volume.
 * @return {number} - The converted volume value.
 */
export const convertVolume = (
  value: number,
  fromUnit: string,
  toUnit: string
): number => {
  let liters: number;

  switch (fromUnit) {
    case "tablespoons":
      liters = value * 0.0147867648;
      break;
    case "cubicInches":
      liters = value * 0.016387064;
      break;
    case "cups":
      liters = value * 0.236588237;
      break;
    case "cubicFeet":
      liters = value * 28.3168466;
      break;
    case "gallons":
      liters = value * 3.78541178;
      break;
    case "liters":
      liters = value;
      break;
    default:
      throw new Error(`Unsupported volume unit: ${fromUnit}`);
  }
  
  switch (toUnit) {
    case "tablespoons":
      return liters / 0.0147867648;
    case "cubicInches":
      return liters / 0.016387064;
    case "cups":
      return liters / 0.236588237;
    case "cubicFeet":
      return liters / 28.3168466;
    case "gallons":
      return liters / 3.78541178;
    case "liters":
      return liters;
    default:
      throw new Error(`Unsupported volume unit: ${toUnit}`);
  }
  
};
