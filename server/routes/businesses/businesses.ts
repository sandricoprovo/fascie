import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.route('/').get(async (req, res) => {
    // Grabs all businesses from the DB
    const businessesList = await prisma.business.findMany({
        include: {
            _count: true,
            categories: { select: { category: true } },
            location: true,
            testimonials: true,
        },
    });

    res.status(200).json({
        businesses: businessesList,
    });
});

export default router;
