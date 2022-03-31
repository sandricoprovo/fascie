import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.route('/').get(async (req, res) => {
    // Grabs all locations
    const locations = await prisma.location.findMany();

    res.status(200).send({ locations });
});

export default router;
