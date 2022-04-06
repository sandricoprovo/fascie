import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.route('/').get(async (req, res) => {
    const categories = await prisma.categories.findMany();

    res.status(200).send({ categories });
});

router.route('/:id').get(async (req, res) => {
    const categoryId = parseInt(req.params.id);
    const category = await prisma.categories.findFirst({
        where: {
            id: categoryId,
        },
    });

    res.status(200).send({ category });
});

export default router;
