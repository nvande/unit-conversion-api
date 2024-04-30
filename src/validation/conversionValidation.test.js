const { validateConversionRequest } = require('./conversionValidation');

describe('validateConversionRequest Middleware', () => {
  let mockReq;
  let mockRes;
  let mockNext;
  let mockJson;
  let mockStatus;

  beforeEach(() => {
    mockReq = {
      body: {}
    };
    mockJson = jest.fn();
    mockStatus = jest.fn(() => ({
      json: mockJson
    }));
    mockRes = {
      status: mockStatus,
      json: mockJson
    };
    mockNext = jest.fn();
  });

  it('should call next() for valid conversion request with temperature units', () => {
    mockReq.body = {
      inputValue: 100,
      inputUnit: 'celsius',
      targetUnit: 'fahrenheit'
    };
    validateConversionRequest(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return a 400 error for missing required fields', () => {
    validateConversionRequest(mockReq, mockRes, mockNext);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: 'error',
      message: 'Invalid request data',
      details: expect.any(Array)
    });
  });

  it('should return a 400 error for invalid unit types', () => {
    mockReq.body = {
      inputValue: 100,
      inputUnit: 'celsius',
      targetUnit: 'kilogram'
    };
    validateConversionRequest(mockReq, mockRes, mockNext);
    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      status: 'error',
      message: 'Invalid request data',
      details: expect.arrayContaining([
        expect.stringContaining('"targetUnit" must be one of')
      ])
    });
  });

  it('should call next() for valid conversion request with volume units', () => {
    mockReq.body = {
      inputValue: 10,
      inputUnit: 'liters',
      targetUnit: 'gallons'
    };
    validateConversionRequest(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });
});
