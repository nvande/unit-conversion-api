jest.mock("../utils/conversionUtils", () => ({
  convertTemperature: jest.fn(),
  convertVolume: jest.fn(),
}));

const { convert, gradeAnswer } = require("../services/ConversionService");
const {
  convertTemperature,
  convertVolume,
} = require("../utils/conversionUtils");
const { TemperatureUnit, VolumeUnit } = require("../models/ConversionTypes");

describe("ConversionService", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    convertTemperature.mockReturnValue(30);
    convertVolume.mockReturnValue(1000);
  });

  describe("convert", () => {
    it("converts temperature units correctly", () => {
      const result = convert(
        1,
        TemperatureUnit.Celsius,
        TemperatureUnit.Fahrenheit
      );
      expect(result).toBe(30);
      expect(convertTemperature).toHaveBeenCalledWith(
        1,
        TemperatureUnit.Celsius,
        TemperatureUnit.Fahrenheit
      );
    });

    it("converts volume units correctly", () => {
      const result = convert(1, VolumeUnit.Liters, VolumeUnit.CubicInches);
      expect(result).toBe(1000);
      expect(convertVolume).toHaveBeenCalledWith(
        1,
        VolumeUnit.Liters,
        VolumeUnit.CubicInches
      );
    });

    it("throws an error for unsupported unit conversions", () => {
      expect(() =>
        convert(1, TemperatureUnit.Celsius, VolumeUnit.Gallons)
      ).toThrow("Unsupported or mismatched unit conversion types");
    });
  });

  describe("gradeAnswer", () => {
    it("grades correctly when values match", () => {
      expect(gradeAnswer(1.245, 1.24)).toBe(true);
      expect(gradeAnswer(1.25, 1.34)).toBe(true);
      expect(gradeAnswer(0.95, 0.96)).toBe(true);
      expect(gradeAnswer(1.80, 1.84)).toBe(true);
    });

    it("grades correctly when values do not match", () => {
      expect(gradeAnswer(1.251, 1.24)).toBe(false);
      expect(gradeAnswer(1.14, 1.19)).toBe(false);
      expect(gradeAnswer(1.09, 1.04)).toBe(false);
      expect(gradeAnswer(0.96, 0.94)).toBe(false);
    });
  });
});
