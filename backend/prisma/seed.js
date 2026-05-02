"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    // 1. Create Cities
    const bangalore = await prisma.city.upsert({
        where: { slug: 'bangalore' },
        update: {},
        create: { name: 'Bangalore', slug: 'bangalore', description: 'Silicon Valley of India' }
    });
    const chennai = await prisma.city.upsert({
        where: { slug: 'chennai' },
        update: {},
        create: { name: 'Chennai', slug: 'chennai', description: 'Automobile Hub of India' }
    });
    const hyderabad = await prisma.city.upsert({
        where: { slug: 'hyderabad' },
        update: {},
        create: { name: 'Hyderabad', slug: 'hyderabad', description: 'Pharma and Tech Center' }
    });
    const kochi = await prisma.city.upsert({
        where: { slug: 'kochi' },
        update: {},
        create: { name: 'Kochi', slug: 'kochi', description: 'Queen of the Arabian Sea' }
    });
    // 2. Create Super Admin
    const hashedPassword = await bcryptjs_1.default.hash('Admin@123', 10);
    await prisma.user.upsert({
        where: { email: 'superadmin@citydata.ai' },
        update: {},
        create: {
            email: 'superadmin@citydata.ai',
            password: hashedPassword,
            name: 'Super Admin',
            role: 'SUPER_ADMIN'
        }
    });
    // 3. Create City Admins
    const cities = [bangalore, chennai, hyderabad, kochi];
    for (const city of cities) {
        await prisma.user.upsert({
            where: { email: `admin.${city.slug}@citydata.ai` },
            update: {},
            create: {
                email: `admin.${city.slug}@citydata.ai`,
                password: hashedPassword,
                name: `${city.name} Admin`,
                role: 'CITY_ADMIN',
                cityId: city.id
            }
        });
    }
    // 4. Create Normal User
    const userPassword = await bcryptjs_1.default.hash('User@123', 10);
    await prisma.user.upsert({
        where: { email: 'user@citydata.ai' },
        update: {},
        create: {
            email: 'user@citydata.ai',
            password: userPassword,
            name: 'Test User',
            role: 'NORMAL'
        }
    });
    console.log('✅ Seed data populated successfully');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map