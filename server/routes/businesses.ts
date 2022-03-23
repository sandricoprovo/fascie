import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.route('/').get((req, res) => {
    res.status(200).json({
        message: 'Hello World',
    });
});

export default router;
