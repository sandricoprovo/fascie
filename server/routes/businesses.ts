import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router
    .route('/')
    .get(async (req, res) => {
        // Grabs all businesses from the DB
        const businessesList = await prisma.businesses.findMany({
            include: {
                _count: true,
                categories: { select: { category: true } },
                location: true,
                testimonials: true,
            },
        });

        // Returns business to client
        res.status(200).json({
            businesses: businessesList,
        });
    })
    .post((req, res) => {
        // TODO: Implement endpoint & make async
        res.status(200).json({ message: 'Create Add business endpoint' });
    });

router
    .route('/:id')
    .get(async (req, res) => {
        const businessId = req.params.id;

        // Grabs a single business based on id
        const business = await prisma.businesses.findFirst({
            where: {
                id: parseInt(businessId),
            },
            include: {
                _count: true,
                categories: { select: { category: true } },
                location: true,
                testimonials: true,
            },
        });

        // Returns business to client
        res.status(200).json({ business });
    })
    .put((req, res) => {
        // TODO: Implement endpoint & make async
        res.status(200).json({ message: 'Create Update business endpoint' });
    })
    .delete((req, res) => {
        // TODO: Implement endpoint & make async
        res.status(200).json({ message: 'Create delete business endpoint' });
    });

router.route('/:id/add-follower').put((req, res) => {
    // TODO: Implement endpoint & make async
    res.status(200).json({ message: 'Create update business endpoint' });
});

export default router;
