Frontend repo available here: https://github.com/nvande/unit-conversion-frontend

API live online on AWS EB here: http://unit-conversion-api.us-west-2.elasticbeanstalk.com

# Unit Conversion API

This is a Node.js Typescript Express API to power the backend of the Unit Conversion application

To get started, download the repo and in a terminal window run either:
- `npm run start:dev` to launch the application in Dev (Typescript) mode,
- or run `npm run build` to compile the Typescript into Javascript and then run `npm run start` to launch the build

Once the application is running locally, it will serve requests at localhost:3000/api/v1/convert

## Running tests

The application also has a number of automated tests designed to ensure the application works and is accurate in making conversions.

To run the test suite, run `npm run test`

## Data formatting

To get a conversion, the following body format is required:
```
[{
  inputValue: number;
  inputUnit: Unit;
  targetUnit: Unit;
  studentAnswer?: number|string;
}, ... ]
```

The API will also accept a single request in the body as an object, so you can easily test it with Postman etc with the x-www-form-urlencoded option with the above keys.

After converting, the response will take the following format:
```
[{
    inputValue: number;
    inputUnit: Unit;
    targetUnit: Unit;
    convertedValue?: number;
    studentAnswer?: number;
    gradeStatus?: GradeStatus;
    status: ResponseStatus;
    errorMessage?: string;
}, ... ]
```

The possible units are as follows:
```
TemperatureUnit {
  Kelvin = "kelvin",
  Celsius = "celsius",
  Fahrenheit = "fahrenheit",
  Rankine = "rankine",
}

VolumeUnit {
  Liters = "liters",
  Tablespoons = "tablespoons",
  CubicInches = "cubicInches",
  Cups = "cups",
  CubicFeet = "cubicFeet",
  Gallons = "gallons",
}

GradeStatus = "correct" | "incorrect" | "invalid";
ResponseStatus = "success" | "error";
Unit = TemperatureUnit | VolumeUnit;

```

## Future Improvements
1. Add support for more conversion types. Currently, the given set of supported conversions and units make the application only useful within a very narrow set of possible assignments.
2. Add database for saving student information. Currently, all of the student information is stored on the front end and the API has no database capabilities. Adding support for user accounts and saved classroom student lists and assignment templates could enable a user to save even more time when grading assignments.
3. Purchase a unique backend URL and assign an SSL certificate. As it is, the backend only supports HTTP via AWS Elastic Beanstalk and purchasing a unique domain would enable true HTTPS support on the backend.
4. Improve API usability by providing a better experience in the browser on how to use the API if you hit the API home route. Come up with better API routing scheme, ie, /api/v1/convert and support for potentially other useful endpoints.
5. Complete test coverage for the front end of the application. Minor refactoring of front end to support futher development. More testing for potential UI hiccups on the front end.
