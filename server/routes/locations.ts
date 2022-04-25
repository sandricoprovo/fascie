import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { LocationPayload } from '../types';

// MOCK
import { mockLocation } from '../mock/mockLocation';

const router = Router();
const prisma = new PrismaClient();

router
    .route('/')
    .get(async (_, res) => {
        try {
            const locations = await prisma.locations.findMany();
            res.status(200).json({ locations });
        } catch (error) {
            res.status(404).json({
                message: 'There was an error getting the list of locations.',
                error,
            });
        }
    })
    .post(async (req, res) => {
        try {
            const { country, location, provinceState } =
                req.body as LocationPayload;

            // TODO: Verify a location as valid before adding.

            // Adds a new location
            const newLocation = await prisma.locations.create({
                data: {
                    country,
                    location,
                    provinceState,
                },
            });

            res.status(200).json({ newLocation });
        } catch (error) {
            res.status(422).json({
                message: 'There was an error adding that location.',
                error,
            });
        }
    });

router.route('/:id').get(async (req, res) => {
    try {
        const locationId = parseInt(req.params.id);
        // Grabs a location, and its associated businesses
        const location = await prisma.locations.findFirst({
            where: {
                id: locationId,
            },
            include: {
                businesses: {
                    where: {
                        locationId,
                    },
                    include: {
                        _count: true,
                        category: true,
                    },
                },
            },
        });

        res.status(200).json({ location });
    } catch (error) {
        res.status(404).json({
            message: 'There was an error getting that location.',
            error,
        });
    }
});

export default router;
