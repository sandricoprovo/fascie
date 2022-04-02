import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.route('/').get(async (req, res) => {
    const categories = await prisma.categories.findMany();

    res.status(200).send({ categories });
});

export default router;
