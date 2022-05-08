import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import { CategoryPayload } from '../types/categories';

const router = Router();
const prisma = new PrismaClient();

router
    .route('/')
    .get(async (_, res) => {
        try {
            const categories = await prisma.categories.findMany();
            res.status(200).json({ categories });
        } catch (error) {
            res.status(404).json({
                message: 'There was an error getting the list of categories.',
                error,
            });
        }
    })
    .post(async (req, res) => {
        try {
            const { category } = req.body as CategoryPayload;
            // Adds new category
            const newCategory = await prisma.categories.create({
                data: { category: category.toLowerCase() },
            });

            res.status(200).json({ newCategory });
        } catch (error) {
            res.status(200).json({
                message: 'There was an error adding that category.',
                error,
            });
        }
    });

router.route('/:id').get(async (req, res) => {
    try {
        const categoryId = parseInt(req.params.id);
        // Locates the category with the matching id.
        const category = await prisma.categories.findFirst({
            where: {
                id: categoryId,
            },
        });

        res.status(200).json({ category });
    } catch (error) {
        // Handles sending error response
        res.status(401).json({
            message: 'There was an error finding that category.',
            error,
        });
    }
});

export default router;
