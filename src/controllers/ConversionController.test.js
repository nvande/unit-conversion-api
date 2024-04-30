const { convertAndGradeUnits } = require("./ConversionController");
const ConversionService = require("../services/ConversionService");

ConversionService.convert = jest.fn();
ConversionService.gradeAnswer = jest.fn();

describe("convertAndGradeUnits", () => {
  let mockRequest;
  let mockResponse;
  let responseObject = {};
  let statusFunction;

  beforeEach(() => {
    statusFunction = jest.fn(() => responseObject);
    responseObject = { json: jest.fn() };

    mockResponse = {
      json: jest.fn(),
      status: statusFunction,
    };

    jest.clearAllMocks();

    ConversionService.convert.mockReturnValue(0.1);
    ConversionService.gradeAnswer.mockReturnValue(true);
  });

  it("should handle conversion and grading and provide a response", async () => {
    mockRequest = {
      body: {
        inputValue: 100,
        inputUnit: "meters",
        targetUnit: "kilometers",
        studentAnswer: "0.1",
      },
    };

    await convertAndGradeUnits(mockRequest, mockResponse);

    expect(ConversionService.convert).toHaveBeenCalledWith(
      100,
      "meters",
      "kilometers"
    );
    expect(ConversionService.gradeAnswer).toHaveBeenCalledWith(0.1, 0.1);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "success",
        gradeStatus: "correct",
      })
    );
  });

  it("should perform conversion without studentAnswer and not grade", async () => {
    mockRequest = {
      body: {
        inputValue: 100,
        inputUnit: "meters",
        targetUnit: "kilometers",
      },
    };

    ConversionService.convert.mockReturnValue(0.1);

    await convertAndGradeUnits(mockRequest, mockResponse);

    expect(ConversionService.convert).toHaveBeenCalledWith(
      100,
      "meters",
      "kilometers"
    );
    expect(ConversionService.gradeAnswer).not.toHaveBeenCalled();

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        inputValue: 100,
        inputUnit: "meters",
        targetUnit: "kilometers",
        convertedValue: 0.1,
        gradeStatus: undefined,
        status: "success",
      })
    );
  });

  it("should handle errors gracefully", async () => {
    mockRequest = {
      body: {
        inputValue: 100,
        inputUnit: "meters",
        targetUnit: "kilometers",
        studentAnswer: "0.1",
      },
    };

    ConversionService.convert.mockImplementation(() => {
      throw new Error("Conversion failed");
    });

    statusFunction.mockReturnValue(mockResponse);

    await convertAndGradeUnits(mockRequest, mockResponse);

    expect(statusFunction).toHaveBeenCalledWith(400);

    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        errorMessage: "An error occurred during the conversion process.",
      })
    );
  });
});
