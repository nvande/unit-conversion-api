import express from 'express';
import routes from './routes/routes';

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', routes);

if (require.main === module) {
    const port: number = parseInt(process.env.PORT as string, 10) || 3000;
    app.listen(port, (): void => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;
