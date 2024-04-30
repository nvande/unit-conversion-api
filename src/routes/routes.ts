import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Unit Conversion API');
});

router.post('/convert', (req: Request, res: Response) => {
    res.json({
        convertedValue: 'Example result',
        isCorrect: 'Example grading'
    });
});

export default router;
