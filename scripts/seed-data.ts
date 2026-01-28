// Seed Data Script for Strapi
// Run this in Strapi Admin or via API

const STRAPI_URL = 'http://localhost:1337';
const ADMIN_TOKEN = ''; // Add your admin token here after creating one in Strapi

const seedProvinces = [
    { name: 'West Papua', slug: 'west-papua', region: 'papua' },
    { name: 'Papua', slug: 'papua', region: 'papua' },
    { name: 'East Nusa Tenggara', slug: 'east-nusa-tenggara', region: 'bali_nusa_tenggara' },
    { name: 'East Java', slug: 'east-java', region: 'java' },
    { name: 'East Kalimantan', slug: 'east-kalimantan', region: 'kalimantan' },
    { name: 'North Sumatra', slug: 'north-sumatra', region: 'sumatra' },
    { name: 'Central Sulawesi', slug: 'central-sulawesi', region: 'sulawesi' },
    { name: 'Central Java', slug: 'central-java', region: 'java' },
    { name: 'Maluku', slug: 'maluku', region: 'maluku' },
    { name: 'Southeast Sulawesi', slug: 'southeast-sulawesi', region: 'sulawesi' },
];

const seedCategories = [
    { name: 'Beach', slug: 'beach', description: 'Coastal destinations and islands' },
    { name: 'Nature', slug: 'nature', description: 'Natural wonders and landscapes' },
    { name: 'Culture', slug: 'culture', description: 'Cultural heritage and traditions' },
    { name: 'Adventure', slug: 'adventure', description: 'Adventure and outdoor activities' },
    { name: 'Diving', slug: 'diving', description: 'Diving and snorkeling spots' },
];

const seedAuthors = [
    { name: 'Sarah Anderson', bio: 'Travel writer specializing in Indonesian hidden gems.' },
    { name: 'David Chen', bio: 'Adventure photographer and explorer.' },
    { name: 'Maya Putri', bio: 'Local guide and cultural expert.' },
];

const seedDestinations = [
    {
        name: 'Raja Ampat',
        slug: 'raja-ampat',
        short_description: 'Crystal clear waters and untouched islands paradise.',
        description: '<p>Raja Ampat, which literally translates to "The Four Kings", is an archipelago located off the northwest tip of Bird\'s Head Peninsula in West Papua, Indonesia.</p><p>The region contains the richest marine biodiversity on Earth, with scientific surveys recording more than 1,500 fish species, 600 coral species, and 700 mollusk species.</p>',
        latitude: -0.4696,
        longitude: 130.8336,
        is_featured: true,
    },
    {
        name: 'Wae Rebo Village',
        slug: 'wae-rebo',
        short_description: 'Ancient traditional village above the clouds.',
        description: '<p>Wae Rebo is an isolated Manggaraian village in the mountains of Flores, known for its traditional cone-shaped houses called Mbaru Niang.</p>',
        latitude: -8.7561,
        longitude: 120.2833,
        is_featured: true,
    },
    {
        name: 'Tumpak Sewu Waterfall',
        slug: 'tumpak-sewu',
        short_description: 'The majestic thousand waterfalls hidden in Java.',
        description: '<p>Tumpak Sewu, also known as Coban Sewu, is a tiered waterfall that resembles a curtain of water cascading down a cliff face.</p>',
        latitude: -8.2286,
        longitude: 112.9186,
        is_featured: true,
    },
    {
        name: 'Derawan Islands',
        slug: 'derawan-islands',
        short_description: 'Pristine beaches and jellyfish lake sanctuary.',
        description: '<p>The Derawan Islands are an archipelago in East Kalimantan, known for their incredible marine biodiversity and the famous non-stinging jellyfish lake.</p>',
        latitude: 2.2833,
        longitude: 118.2667,
        is_featured: true,
    },
    {
        name: 'Lake Toba',
        slug: 'lake-toba',
        short_description: 'The largest volcanic lake in the world.',
        description: '<p>Lake Toba is a large natural lake in North Sumatra, occupying the caldera of a supervolcano.</p>',
        latitude: 2.6167,
        longitude: 98.8333,
        is_featured: false,
    },
    {
        name: 'Kelimutu Crater Lakes',
        slug: 'kelimutu-lakes',
        short_description: 'Three mysterious crater lakes that change colors.',
        description: '<p>Kelimutu is a volcano with three crater lakes of varying colors on Flores island.</p>',
        latitude: -8.7703,
        longitude: 121.8147,
        is_featured: false,
    },
];

async function seedData() {
    console.log('Starting seed...');

    if (!ADMIN_TOKEN) {
        console.error('Please set ADMIN_TOKEN first!');
        console.log('1. Go to Strapi Admin Panel');
        console.log('2. Settings > API Tokens');
        console.log('3. Create a new token with full access');
        console.log('4. Add it to this script');
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`,
    };

    // Seed Provinces
    console.log('Seeding provinces...');
    for (const province of seedProvinces) {
        try {
            const res = await fetch(`${STRAPI_URL}/api/provinces`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ data: province }),
            });
            const data = await res.json();
            console.log(`Created province: ${province.name}`, res.status);
        } catch (error) {
            console.error(`Failed to create province: ${province.name}`, error);
        }
    }

    // Seed Categories
    console.log('Seeding categories...');
    for (const category of seedCategories) {
        try {
            const res = await fetch(`${STRAPI_URL}/api/categories`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ data: category }),
            });
            console.log(`Created category: ${category.name}`, res.status);
        } catch (error) {
            console.error(`Failed to create category: ${category.name}`, error);
        }
    }

    // Seed Authors
    console.log('Seeding authors...');
    for (const author of seedAuthors) {
        try {
            const res = await fetch(`${STRAPI_URL}/api/authors`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ data: author }),
            });
            console.log(`Created author: ${author.name}`, res.status);
        } catch (error) {
            console.error(`Failed to create author: ${author.name}`, error);
        }
    }

    // Seed Destinations
    console.log('Seeding destinations...');
    for (const destination of seedDestinations) {
        try {
            const res = await fetch(`${STRAPI_URL}/api/destinations`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ data: destination }),
            });
            console.log(`Created destination: ${destination.name}`, res.status);
        } catch (error) {
            console.error(`Failed to create destination: ${destination.name}`, error);
        }
    }

    console.log('Seed complete!');
}

seedData();
