import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Async function to seed the database for test data
async function seed() {
    // CATEGORIES
    const softwareCategory = await prisma.categories.create({
        data: {
            category: 'software',
        },
    });
    const hardwareCategory = await prisma.categories.create({
        data: {
            category: 'hardware',
        },
    });
    const audioCategory = await prisma.categories.create({
        data: {
            category: 'audio',
        },
    });

    // LOCATIONS / BUSINESSES / USERS
    const halifax = await prisma.locations.create({
        data: {
            location: 'Halifax',
            country: 'Canada',
            provinceState: 'Nova Scotia',
            businesses: {
                create: {
                    businessName: 'Samson UI',
                    email: 'samsonui@example.com',
                    password: 'samson123',
                    hasShipping: false,
                    ownerName: 'Samson Boom',
                    website: 'https://sandricoprovo.dev',
                    twitter: 'https://twitter.com/sandricoprovo',
                    instagram: 'https://www.instagram.com/sandricop/',
                    facebook: 'https://www.facebook.com/sandrico3.0',
                    keywords: [
                        'software',
                        'agency',
                        'web development',
                        'service',
                    ],
                    categoriesId: softwareCategory.id,
                    followers: {
                        create: {
                            user: {
                                create: {
                                    name: 'Sasuke Uchiha',
                                    email: 'sasuke@example.com',
                                    password: 'sasuke123',
                                },
                            },
                        },
                    },
                    testimonials: {
                        create: {
                            testimonial: 'Nope, nope nope.',
                        },
                    },
                },
            },
        },
    });
    const wolfville = await prisma.locations.create({
        data: {
            location: 'Wolfville',
            country: 'Canada',
            provinceState: 'Nova Scotia',
            businesses: {
                create: {
                    businessName: 'Yeti Audio',
                    email: 'yetiaudio@example.com',
                    password: 'yeti123',
                    hasShipping: false,
                    ownerName: 'Mike Yeti',
                    website: 'https://sandricoprovo.dev',
                    instagram: 'https://www.instagram.com/sandricop/',
                    facebook: 'https://www.facebook.com/sandrico3.0',
                    keywords: ['audio', 'music', 'equipment'],
                    categoriesId: audioCategory.id,
                    followers: {
                        create: {
                            user: {
                                create: {
                                    name: 'Naruto Uzimaki',
                                    email: 'naruto@example.com',
                                    password: 'naruto123',
                                },
                            },
                        },
                    },
                    testimonials: {
                        create: {
                            testimonial:
                                'Tried this place out and the owner is super nice.',
                        },
                    },
                },
            },
        },
    });
    const lunenburg = await prisma.locations.create({
        data: {
            location: 'Lunenburg',
            country: 'Canada',
            provinceState: 'Nova Scotia',
            businesses: {
                create: {
                    businessName: 'Mac Hardware',
                    email: 'machardware@example.com',
                    password: 'mac123',
                    hasShipping: true,
                    ownerName: 'Mac Port',
                    website: 'https://sandricoprovo.dev',
                    instagram: 'https://www.instagram.com/sandricop/',
                    facebook: 'https://www.facebook.com/sandrico3.0',
                    keywords: ['computer', 'hardware', 'macbook', 'repair'],
                    categoriesId: hardwareCategory.id,
                    followers: {
                        create: {
                            user: {
                                create: {
                                    name: 'Urza Scarlet',
                                    email: 'urzascarlet@example.com',
                                    password: 'urza123',
                                },
                            },
                        },
                    },
                    testimonials: {
                        create: {
                            testimonial: 'This is the best business ever!',
                        },
                    },
                },
            },
        },
    });
}

// RUN SEED
seed()
    .catch((error) => {
        console.log('Seed Error', error);
        process.exit(1);
    })
    .finally(() => {
        // Disconnect from the prisma client
        prisma.$disconnect();
    });
