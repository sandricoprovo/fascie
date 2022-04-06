import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { getRandomId } from '../utils';

// MOCK
import { mockBusiness } from '../mock/mockBusiness';
// MOCK

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
    .post(async (req, res) => {
        const {
            id,
            ownerName,
            businessName,
            hasPaidFee,
            email,
            password,
            hasShipping,
            bannerImg,
            website,
            facebook,
            instagram,
            locationId,
            keywords,
            category,
            twitter,
        } = mockBusiness;

        // TODO: Implement endpoint & make async
        const newBusiness = await prisma.businesses.create({
            data: {
                businessName,
                email,
                hasShipping,
                ownerName,
                password,
                bannerImg,
                facebook,
                hasPaidFee,
                id: getRandomId(),
                instagram,
                locationId,
                keywords,
                twitter,
                website,
                categories: {
                    create: {
                        category: {
                            create: {
                                category,
                                id: getRandomId(),
                            },
                        },
                    },
                },
            },
            select: {
                categories: true,
            },
        });

        res.status(200).json({ business: newBusiness });
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
