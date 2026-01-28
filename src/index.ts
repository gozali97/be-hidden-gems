// Strapi Bootstrap - Seed Data on First Run
export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    console.log('🌱 Starting Seed Check...');

    // Helper to create if not exists
    const createIfNotExists = async (uid, data, lookupField = 'slug') => {
      try {
        const existing = await strapi.entityService.findMany(uid, {
          filters: { [lookupField]: data[lookupField] },
        });

        if (existing && existing.length > 0) {
          console.log(`  ↻ Skipping ${data.name || data.title} (already exists)`);
          return existing[0];
        }

        const created = await strapi.entityService.create(uid, {
          data: { ...data, publishedAt: new Date() },
        });
        console.log(`  ✓ Created ${data.name || data.title}`);
        return created;
      } catch (error) {
        console.error(`  ✗ Error creating ${data.name || data.title}:`, error.message);
        return null;
      }
    };

    // Seed Provinces
    console.log('--- Seeding Provinces ---');
    const provinces = [
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
      { name: 'Bali', slug: 'bali', region: 'bali_nusa_tenggara' },
      { name: 'West Java', slug: 'west-java', region: 'java' },
    ];

    const createdProvinces: Record<string, any> = {};
    for (const province of provinces) {
      const result = await createIfNotExists('api::province.province', province);
      if (result) createdProvinces[province.slug] = result;
    }

    // Seed Categories
    console.log('--- Seeding Categories ---');
    const categories = [
      { name: 'Beach', slug: 'beach' },
      { name: 'Nature', slug: 'nature' },
      { name: 'Culture', slug: 'culture' },
      { name: 'Adventure', slug: 'adventure' },
      { name: 'Diving', slug: 'diving' },
    ];

    const createdCategories: Record<string, any> = {};
    for (const category of categories) {
      const result = await createIfNotExists('api::category.category', category);
      if (result) createdCategories[category.slug] = result;
    }

    // Seed Authors
    console.log('--- Seeding Authors ---');
    const authors = [
      { name: 'Sarah Anderson', slug: 'sarah-anderson', bio: 'Travel writer specializing in Indonesian hidden gems.' },
      { name: 'David Chen', slug: 'david-chen', bio: 'Adventure photographer and explorer.' },
      { name: 'Maya Putri', slug: 'maya-putri', bio: 'Local guide and cultural expert.' },
    ];

    const createdAuthors: Record<string, any> = {};
    for (const author of authors) {
      const result = await createIfNotExists('api::author.author', author, 'name');
      if (result) createdAuthors[author.name] = result;
    }

    // Seed Destinations
    console.log('--- Seeding Destinations ---');
    const destinations = [
      {
        name: 'Raja Ampat',
        slug: 'raja-ampat',
        short_description: 'Crystal clear waters and untouched islands paradise.',
        description: '<p>Raja Ampat, which literally translates to "The Four Kings", is an archipelago located off the northwest tip of Bird\'s Head Peninsula in West Papua, Indonesia.</p>',
        latitude: -0.4696,
        longitude: 130.8336,
        is_featured: true,
        province: createdProvinces['west-papua']?.id,
      },
      {
        name: 'Wae Rebo Village',
        slug: 'wae-rebo',
        short_description: 'Ancient traditional village above the clouds.',
        description: '<p>Wae Rebo is an isolated Manggaraian village in the mountains of Flores.</p>',
        latitude: -8.7561,
        longitude: 120.2833,
        is_featured: true,
        province: createdProvinces['east-nusa-tenggara']?.id,
      },
      {
        name: 'Tumpak Sewu Waterfall',
        slug: 'tumpak-sewu',
        short_description: 'The majestic thousand waterfalls hidden in Java.',
        description: '<p>Tumpak Sewu, also known as Coban Sewu, is a tiered waterfall that resembles a curtain of water cascading down a cliff face.</p>',
        latitude: -8.2286,
        longitude: 112.9186,
        is_featured: true,
        province: createdProvinces['east-java']?.id,
      },
      {
        name: 'Derawan Islands',
        slug: 'derawan-islands',
        short_description: 'Pristine beaches and jellyfish lake sanctuary.',
        description: '<p>The Derawan Islands are an archipelago in East Kalimantan.</p>',
        latitude: 2.2833,
        longitude: 118.2667,
        is_featured: true,
        province: createdProvinces['east-kalimantan']?.id,
      },
      {
        name: 'Lake Toba',
        slug: 'lake-toba',
        short_description: 'The largest volcanic lake in the world.',
        description: '<p>Lake Toba is a massive natural lake occupying the caldera of a supervolcano in North Sumatra.</p>',
        latitude: 2.6167,
        longitude: 98.8333,
        is_featured: false,
        province: createdProvinces['north-sumatra']?.id,
      },
      {
        name: 'Kelimutu Crater Lakes',
        slug: 'kelimutu-lakes',
        short_description: 'Three mysterious crater lakes that change colors.',
        description: '<p>Kelimutu is a volcano on Flores Island containing three crater lakes of varying colors.</p>',
        latitude: -8.7703,
        longitude: 121.8147,
        is_featured: false,
        province: createdProvinces['east-nusa-tenggara']?.id,
      },
    ];

    const createdDestinations: Record<string, any> = {};
    for (const destination of destinations) {
      const result = await createIfNotExists('api::destination.destination', destination);
      if (result) createdDestinations[destination.slug] = result;
    }

    // Seed Articles
    console.log('--- Seeding Articles ---');
    const articles = [
      {
        title: 'Exploring the Hidden Beaches of Lombok',
        slug: 'hidden-beaches-lombok',
        excerpt: 'Discover pristine beaches away from the tourist crowds.',
        content: '<p>Lombok, the neighboring island to Bali, holds secrets that few travelers discover.</p>',
        is_featured: true,
        category: createdCategories['beach']?.id,
        author: createdAuthors['Sarah Anderson']?.id,
      },
      {
        title: 'Diving in Raja Ampat: A Complete Guide',
        slug: 'raja-ampat-diving-guide',
        excerpt: 'Everything you need to know about diving in the world\'s most biodiverse marine region.',
        content: '<p>Raja Ampat is home to 75% of all known coral species and over 1,500 fish species.</p>',
        is_featured: true,
        category: createdCategories['diving']?.id,
        author: createdAuthors['David Chen']?.id,
        destination: createdDestinations['raja-ampat']?.id,
      },
      {
        title: 'The Ancient Traditions of Toraja',
        slug: 'ancient-toraja-traditions',
        excerpt: 'Experience unique funeral rituals and centuries-old cultural practices.',
        content: '<p>The Toraja people of South Sulawesi have maintained their elaborate death rituals for centuries.</p>',
        is_featured: true,
        category: createdCategories['culture']?.id,
        author: createdAuthors['Maya Putri']?.id,
      },
    ];

    for (const article of articles) {
      await createIfNotExists('api::article.article', article);
    }

    console.log('✅ Seed Check Complete!');
  },
};
