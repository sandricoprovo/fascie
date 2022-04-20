import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router
    .route('/')
    .get(async (req, res) => {
        try {
            const locations = await prisma.locations.findMany();
            res.status(200).send({ locations });
        } catch (error) {
            res.status(404).json({
                message: 'There was an error getting the list of locations.',
                error,
            });
        }
    })
    .post(async (req, res) => {
        // TODO: Allow users to add locations
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

        res.status(200).send({ location });
    } catch (error) {
        res.status(404).json({
            message: 'There was an error getting that location.',
            error,
        });
    }
});

export default router;
