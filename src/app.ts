import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response): void => {
    res.status(200).send('Hello World!');
});

if (require.main === module) {
    const port: number = parseInt(process.env.PORT as string, 10) || 3000;
    app.listen(port, (): void => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;
