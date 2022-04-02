import { PrismaClient } from '@prisma/client';

import { SEED_IDS } from './seedData';

const prisma = new PrismaClient();

// Async function to seed the database for test data
async function seed() {
    const halifax = await prisma.locations.create({
        data: {
            id: SEED_IDS.halifax,
            location: 'Halifax',
            country: 'Canada',
            provinceState: 'Nova Scotia',
            businesses: {
                create: {
                    id: SEED_IDS.samsonUI,
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
                    followers: {
                        create: {
                            user: {
                                create: {
                                    id: SEED_IDS.sasukeUchiha,
                                    name: 'Sasuke Uchiha',
                                    email: 'sasuke@example.com',
                                    password: 'sasuke123',
                                },
                            },
                        },
                    },
                    categories: {
                        create: {
                            category: {
                                create: {
                                    id: SEED_IDS.softwareCategory,
                                    category: 'Software',
                                },
                            },
                        },
                    },
                    testimonials: {
                        create: {
                            id: SEED_IDS.testimonialOne,
                            testimonial: 'Nope, nope nope.',
                        },
                    },
                },
            },
        },
    });
    const wolfville = await prisma.locations.create({
        data: {
            id: SEED_IDS.wolfville,
            location: 'Wolfville',
            country: 'Canada',
            provinceState: 'Nova Scotia',
            businesses: {
                create: {
                    id: SEED_IDS.yetiAudio,
                    businessName: 'Yeti Audio',
                    email: 'yetiaudio@example.com',
                    password: 'yeti123',
                    hasShipping: false,
                    ownerName: 'Mike Yeti',
                    website: 'https://sandricoprovo.dev',
                    instagram: 'https://www.instagram.com/sandricop/',
                    facebook: 'https://www.facebook.com/sandrico3.0',
                    keywords: ['audio', 'music', 'equipment'],
                    followers: {
                        create: {
                            user: {
                                create: {
                                    id: SEED_IDS.narutoUzimaki,
                                    name: 'Naruto Uzimaki',
                                    email: 'naruto@example.com',
                                    password: 'naruto123',
                                },
                            },
                        },
                    },
                    categories: {
                        create: {
                            category: {
                                create: {
                                    id: SEED_IDS.techHardwareCategory,
                                    category: 'Tech Hardware',
                                },
                            },
                        },
                    },
                    testimonials: {
                        create: {
                            id: SEED_IDS.testimonialTwo,
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
            id: SEED_IDS.lunenburg,
            location: 'Lunenburg',
            country: 'Canada',
            provinceState: 'Nova Scotia',
            businesses: {
                create: {
                    id: SEED_IDS.macHardware,
                    businessName: 'Mac Hardware',
                    email: 'machardware@example.com',
                    password: 'mac123',
                    hasShipping: true,
                    ownerName: 'Mac Port',
                    website: 'https://sandricoprovo.dev',
                    instagram: 'https://www.instagram.com/sandricop/',
                    facebook: 'https://www.facebook.com/sandrico3.0',
                    keywords: ['computer', 'hardware', 'macbook', 'repair'],
                    followers: {
                        create: {
                            user: {
                                create: {
                                    id: SEED_IDS.urzaScarlet,
                                    name: 'Urza Scarlet',
                                    email: 'urzascarlet@example.com',
                                    password: 'urza123',
                                },
                            },
                        },
                    },
                    categories: {
                        create: {
                            category: {
                                create: {
                                    id: SEED_IDS.audioCategory,
                                    category: 'Audio',
                                },
                            },
                        },
                    },
                    testimonials: {
                        create: {
                            id: SEED_IDS.testimonialThree,
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
