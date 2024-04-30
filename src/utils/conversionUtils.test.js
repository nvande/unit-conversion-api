const { convertTemperature, convertVolume } = require("./conversionUtils");

describe("convertTemperature", () => {
  const testCases = [
    { from: "fahrenheit", to: "celsius", value: 212, expected: 100 },
    { from: "fahrenheit", to: "kelvin", value: 212, expected: 373.15 },
    { from: "fahrenheit", to: "rankine", value: 212, expected: 671.67 },
    { from: "celsius", to: "fahrenheit", value: 100, expected: 212 },
    { from: "celsius", to: "kelvin", value: 100, expected: 373.15 },
    { from: "celsius", to: "rankine", value: 100, expected: 671.67 },
    { from: "kelvin", to: "fahrenheit", value: 373.15, expected: 212 },
    { from: "kelvin", to: "celsius", value: 373.15, expected: 100 },
    { from: "kelvin", to: "rankine", value: 373.15, expected: 671.67 },
    { from: "rankine", to: "fahrenheit", value: 671.67, expected: 212 },
    { from: "rankine", to: "celsius", value: 671.67, expected: 100 },
    { from: "rankine", to: "kelvin", value: 671.67, expected: 373.15 },
    { from: "fahrenheit", to: "celsius", value: 32, expected: 0 },
    { from: "fahrenheit", to: "kelvin", value: 32, expected: 273.15 },
    { from: "fahrenheit", to: "rankine", value: 32, expected: 491.67 },
    { from: "celsius", to: "fahrenheit", value: 0, expected: 32 },
    { from: "celsius", to: "kelvin", value: 0, expected: 273.15 },
    { from: "celsius", to: "rankine", value: 0, expected: 491.67 },
    { from: "kelvin", to: "fahrenheit", value: 273.15, expected: 32 },
    { from: "kelvin", to: "celsius", value: 273.15, expected: 0 },
    { from: "kelvin", to: "rankine", value: 273.15, expected: 491.67 },
    { from: "rankine", to: "fahrenheit", value: 491.67, expected: 32 },
    { from: "rankine", to: "celsius", value: 491.67, expected: 0 },
    { from: "rankine", to: "kelvin", value: 491.67, expected: 273.15 },
  ];
  testCases.forEach(({ from, to, value, expected }) => {
    test(`converts ${from} to ${to} correctly with value ${value}`, () => {

      // 3 digits of accuracy
      expect(convertTemperature(value, from, to)).toBeCloseTo(expected, 3);
    });
  });

  test('should throw an error for unsupported fromUnit "degrees"', () => {
    expect(() => {
      convertTemperature(100, "degrees", "celsius");
    }).toThrow();
  });

  test('should throw an error for unsupported toUnit "degrees"', () => {
    expect(() => {
      convertTemperature(100, "celsius", "degrees");
    }).toThrow();
  });

  test('should throw the correct error for unsupported fromUnit "newton"', () => {
    expect(() => {
      convertTemperature(100, "newton", "fahrenheit");
    }).toThrow("Unsupported temperature unit: newton");
  });

  test('should throw the correct error for unsupported toUnit "newton"', () => {
    expect(() => {
      convertTemperature(100, "fahrenheit", "newton");
    }).toThrow("Unsupported temperature unit: newton");
  });

  const validUnits = ["fahrenheit", "kelvin", "rankine", "celsius"];
  validUnits.forEach((fromUnit) => {
    validUnits.forEach((toUnit) => {
      test(`should not throw an error for valid conversion from ${fromUnit} to ${toUnit}`, () => {
        expect(() => {
          convertTemperature(100, fromUnit, toUnit);
        }).not.toThrow();
      });
    });
  });
});

describe("convertVolume", () => {
  const testCases = [
    { from: "tablespoons", to: "liters", value: 67.628, expected: 1 },
    { from: "tablespoons", to: "liters", value: 135, expected: 1.996 },
    { from: "tablespoons", to: "cubicInches", value: 192, expected: 173.25 },
    { from: "tablespoons", to: "cubicInches", value: 221.645, expected: 200 },
    { from: "tablespoons", to: "cups", value: 16, expected: 1 },
    { from: "tablespoons", to: "cups", value: 31, expected: 1.9375 },
    { from: "tablespoons", to: "cubicFeet", value: 7660.05, expected: 4 },
    { from: "tablespoons", to: "cubicFeet", value: 3000, expected: 1.566569 },
    { from: "tablespoons", to: "gallons", value: 256, expected: 1 },
    { from: "tablespoons", to: "gallons", value: 500, expected: 1.953 },
    { from: "liters", to: "tablespoons", value: 1, expected: 67.628 },
    { from: "liters", to: "tablespoons", value: 15.57, expected: 1052.9687 },
    { from: "liters", to: "cubicInches", value: 1, expected: 61.024 },
    { from: "liters", to: "cubicInches", value: 1.75, expected: 106.792 },
    { from: "liters", to: "cups", value: 1, expected: 4.227 },
    { from: "liters", to: "cups", value: 2, expected: 8.454 },
    { from: "liters", to: "cubicFeet", value: 1, expected: 0.035 },
    { from: "liters", to: "cubicFeet", value: 0.5, expected: 0.0175 },
    { from: "liters", to: "gallons", value: 1, expected: 0.264 },
    { from: "liters", to: "gallons", value: 15.1416, expected: 4 },
    { from: "cubicInches", to: "tablespoons", value: 173.25, expected: 192 },
    { from: "cubicInches", to: "tablespoons", value: 346.5, expected: 384 },
    { from: "cubicInches", to: "liters", value: 61.024, expected: 1 },
    { from: "cubicInches", to: "liters", value: 122.048, expected: 2 },
    { from: "cubicInches", to: "cups", value: 14.4375, expected: 1 },
    { from: "cubicInches", to: "cups", value: 30, expected: 2.07792 },
    { from: "cubicInches", to: "cubicFeet", value: 1728, expected: 1 },
    { from: "cubicInches", to: "cubicFeet", value: 1710.72, expected: 0.99 },
    { from: "cubicInches", to: "gallons", value: 231, expected: 1 },
    { from: "cubicInches", to: "gallons", value: 500, expected: 2.1645 },
    { from: "cups", to: "tablespoons", value: 32, expected: 512 },
    { from: "cups", to: "tablespoons", value: 1, expected: 16 },
    { from: "cups", to: "liters", value: 1, expected: 0.2366 },
    { from: "cups", to: "liters", value: 63.4013, expected: 15 },
    { from: "cups", to: "cubicInches", value: 1, expected: 14.4375 },
    { from: "cups", to: "cubicInches", value: 13.8528, expected: 200 },
    { from: "cups", to: "cubicFeet", value: 1, expected: 0.008355 },
    { from: "cups", to: "cubicFeet", value: 120, expected: 1.0026 },
    { from: "cups", to: "gallons", value: 16, expected: 1 },
    { from: "cups", to: "gallons", value: 8.237, expected: 0.515 },
    {
      from: "cubicFeet",
      to: "tablespoons",
      value: 3.348802,
      expected: 6412.9993,
    },
    { from: "cubicFeet", to: "tablespoons", value: 1.527, expected: 2924.2248 },
    { from: "cubicFeet", to: "liters", value: 0.035, expected: 0.99108963 },
    { from: "cubicFeet", to: "liters", value: 1.892, expected: 53.575474 },
    { from: "cubicFeet", to: "cubicInches", value: 1, expected: 1728 },
    { from: "cubicFeet", to: "cubicInches", value: 0.525, expected: 907.2 },
    { from: "cubicFeet", to: "cups", value: 4, expected: 478.753 },
    { from: "cubicFeet", to: "cups", value: 0.256, expected: 30.640208 },
    { from: "cubicFeet", to: "gallons", value: 0.1, expected: 0.748052 },
    { from: "cubicFeet", to: "gallons", value: 0.268, expected: 2.0047792 },
    { from: "gallons", to: "tablespoons", value: 1, expected: 256 },
    { from: "gallons", to: "tablespoons", value: 0.513, expected: 131.328 },
    { from: "gallons", to: "liters", value: 0.264, expected: 0.99934871 },
    { from: "gallons", to: "liters", value: 1.571, expected: 5.9468819 },
    { from: "gallons", to: "cubicInches", value: 1, expected: 231 },
    { from: "gallons", to: "cubicInches", value: 0.563, expected: 130.053 },
    { from: "gallons", to: "cups", value: 1, expected: 16 },
    { from: "gallons", to: "cups", value: 9.1875, expected: 147 },
    { from: "gallons", to: "cubicFeet", value: 1, expected: 0.134 },
    { from: "gallons", to: "cubicFeet", value: 0.513, expected: 0.069 },
  ];

  testCases.forEach(({ from, to, value, expected }) => {
    test(`converts ${from} to ${to} correctly with value ${value}`, () => {

      // 3 digits of accuracy
      expect(convertVolume(value, from, to)).toBeCloseTo(expected, 3);
    });
  });

  test('should throw an error for unsupported fromUnit "quarts"', () => {
    expect(() => {
      convertVolume(100, "quarts", "liters");
    }).toThrow();
  });

  test('should throw an error for unsupported toUnit "quarts"', () => {
    expect(() => {
      convertVolume(100, "liters", "quarts");
    }).toThrow();
  });

  test('should throw the correct error for unsupported fromUnit "pints"', () => {
    expect(() => {
      convertVolume(100, "pints", "gallons");
    }).toThrow("Unsupported volume unit: pints");
  });

  test('should throw the correct error for unsupported toUnit "pints"', () => {
    expect(() => {
      convertVolume(100, "gallons", "pints");
    }).toThrow("Unsupported volume unit: pints");
  });

  const validUnits = [
    "tablespoons",
    "cubicInches",
    "cups",
    "cubicFeet",
    "gallons",
    "liters",
  ];
  validUnits.forEach((fromUnit) => {
    validUnits.forEach((toUnit) => {
      test(`should not throw an error for valid conversion from ${fromUnit} to ${toUnit}`, () => {
        expect(() => {
          convertVolume(100, fromUnit, toUnit);
        }).not.toThrow();
      });
    });
  });
});
