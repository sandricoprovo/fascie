import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { BusinessPayload } from '../types/businesses';

const router = Router();
const prisma = new PrismaClient();

// Uses an abstracted list of included fields so they can be re-used.
const FIELDS_TO_INCLUDE = {
    _count: true,
    category: true,
    location: true,
    testimonials: true,
};

router
    .route('/')
    .get(async (req, res) => {
        try {
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
        } catch (error) {
            // Handles sending error to response
            res.status(404).json({
                message: 'There was an error getting the list of businesses.',
                error,
            });
        }
    })
    .post(async (req, res) => {
        try {
            const {
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
            } = req.body as BusinessPayload;

            // Adds a business to the DB
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
                    instagram,
                    location: {
                        connect: {
                            id: locationId,
                        },
                    },
                    keywords,
                    twitter,
                    website,
                    category: {
                        create: {
                            category,
                        },
                    },
                },
                select: {
                    id: true,
                    category: true,
                    businessName: true,
                    email: true,
                    hasShipping: true,
                    ownerName: true,
                    password: true,
                    bannerImg: true,
                    facebook: true,
                    hasPaidFee: true,
                    instagram: true,
                    keywords: true,
                    twitter: true,
                    website: true,
                    location: {
                        select: {
                            id: true,
                            country: true,
                            location: true,
                            provinceState: true,
                        },
                    },
                },
            });

            res.status(201).json({ business: newBusiness });
        } catch (error) {
            // Handles sending error to response
            res.status(422).json({
                message: 'There was an error adding that business.',
                error,
            });
        }
    });

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            // Grabs a single business based on id
            const business = await prisma.businesses.findFirst({
                where: {
                    id: parseInt(req.params.id),
                },
                include: FIELDS_TO_INCLUDE,
            });

            // Returns business to client
            res.status(200).json({ business });
        } catch (error) {
            res.status(404).json({
                message: 'There was as an error finding that business.',
                error,
            });
        }
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
