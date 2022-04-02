import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.route('/').get(async (req, res) => {
    const locations = await prisma.location.findMany();
    res.status(200).send({ locations });
});

router.route('/:id').get(async (req, res) => {
    const locationId = parseInt(req.params.id);
    // Grabs a location, and its associated businesses
    const location = await prisma.location.findFirst({
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
                    categories: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });

    res.status(200).send({ location });
});

export default router;
