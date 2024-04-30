export type TemperatureUnit = "kelvin" | "celsius" | "fahrenheit" | "rankine";
export type VolumeUnit =
  | "liters"
  | "tablespoons"
  | "cubic-inches"
  | "cups"
  | "cubic-feet"
  | "gallons";
export type ResponseStatus = "correct" | "incorrect" | "invalid";
export type Unit = TemperatureUnit | VolumeUnit;
export type Status = "success" | "error";
