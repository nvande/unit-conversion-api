const request = require("supertest");
const app = require("./app").default;

describe("GET /", () => {
  it("should return healthy", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

describe("POST /convert", () => {
  it("should validate a correct request", async () => {
    const response = await request(app).post("/convert").send({
      inputValue: 100,
      inputUnit: "celsius",
      targetUnit: "fahrenheit",
      studentAnswer: 212,
    });

    expect(response.status).toBe(200);
  });

  it("should return an error for missing required fields", async () => {
    const response = await request(app).post("/convert").send({
      inputUnit: "celsius",
      targetUnit: "fahrenheit",
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: "error",
      message: "Invalid request data",
      details: expect.arrayContaining([
        expect.stringContaining('"inputValue" is required'),
      ]),
    });
  });

  it("should return an error for invalid units", async () => {
    const response = await request(app).post("/convert").send({
      inputValue: 100,
      inputUnit: "degrees",
      targetUnit: "fahrenheit",
      studentAnswer: 212,
    });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      status: "error",
      message: "Invalid request data",
      details: expect.arrayContaining([
        expect.stringContaining('"inputUnit" must be one of'),
      ]),
    });
  });
});
