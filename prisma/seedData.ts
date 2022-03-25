interface SeedIdType {
    halifax: number;
    wolfville: number;
    lunenburg: number;
    samsonUI: number;
    yetiAudio: number;
    macHardware: number;
    testimonialOne: number;
    testimonialTwo: number;
    testimonialThree: number;
    sasukeUchiha: number;
    narutoUzimaki: number;
    urzaScarlet: number;
    softwareCategory: number;
    techHardwareCategory: number;
    audioCategory: number;
}

const SEED_ID_LABELS = [
    'halifax',
    'wolfville',
    'lunenburg',
    'samsonUI',
    'yetiAudio',
    'macHardware',
    'testimonialOne',
    'testimonialTwo',
    'testimonialThree',
    'sasukeUchiha',
    'narutoUzimaki',
    'urzaScarlet',
    'softwareCategory',
    'techHardwareCategory',
    'audioCategory',
];

function generateSeedIds(): SeedIdType {
    const seedIds = SEED_ID_LABELS.map((label) => {
        const randomIdNum = Math.floor(10000000 + Math.random() * 90000000);
        return [label, randomIdNum];
    });
    return Object.fromEntries(seedIds) as SeedIdType;
}

const SEED_IDS = generateSeedIds();

export { SEED_IDS };
