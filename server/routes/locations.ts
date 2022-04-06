import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router
    .route('/')
    .get(async (req, res) => {
        const locations = await prisma.locations.findMany();
        res.status(200).send({ locations });
    })
    .post(async (req, res) => {
        // TODO: Allow users to add locations
    });

router.route('/:id').get(async (req, res) => {
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
});

export default router;
