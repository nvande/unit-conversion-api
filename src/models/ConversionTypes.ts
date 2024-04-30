export enum TemperatureUnit {
  Kelvin = "kelvin",
  Celsius = "celsius",
  Fahrenheit = "fahrenheit",
  Rankine = "rankine",
}

export enum VolumeUnit {
  Liters = "liters",
  Tablespoons = "tablespoons",
  CubicInches = "cubicInches",
  Cups = "cups",
  CubicFeet = "cubicFeet",
  Gallons = "gallons",
}

export type GradeStatus = "correct" | "incorrect" | "invalid";
export type ResponseStatus = "success" | "error";

export type Unit = TemperatureUnit | VolumeUnit;
