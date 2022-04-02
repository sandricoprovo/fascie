import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Uses an abstracted list of included fields so they can be re-used.
const FIELDS_TO_INCLUDE = {
    _count: true,
    categories: { select: { category: true } },
    location: true,
    testimonials: true,
};

router
    .route('/')
    .get(async (req, res) => {
        const queryKeywords = req.query.keywords as string;
        const searchKeywords = queryKeywords && queryKeywords.split(' ');

        // Doesn't filter businesses if no searchKeywords are present
        if (!searchKeywords) {
            // Grabs all businesses from the DB
            const businessesList = await prisma.businesses.findMany({
                include: FIELDS_TO_INCLUDE,
            });

            // Returns business to client
            res.status(200).json({
                businesses: businessesList,
            });
            return;
        }

        // Grabs all businesses from the DB that has matching keywords
        const keywordBusinessesList = await prisma.businesses.findMany({
            where: {
                keywords: {
                    hasSome: searchKeywords,
                },
            },
            include: FIELDS_TO_INCLUDE,
        });

        // Returns business to client
        res.status(200).json({
            businesses: keywordBusinessesList,
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
            include: FIELDS_TO_INCLUDE,
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

router.route('/:id/update-followers').put((req, res) => {
    // TODO: Implement endpoint & make async
    res.status(200).json({ message: 'Create update business endpoint' });
});

export default router;
