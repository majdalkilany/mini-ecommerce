import 'dotenv/config';
import { DataSource } from 'typeorm';
import { User } from '~/users/entities/user.entity';
import { hash } from 'bcrypt';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: false,
});

async function seedAdmin() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const existing = await userRepo.findOneBy({ email: 'admin@example.com' });
  if (existing) {
    console.log('⚠️ Admin user already exists.');
    process.exit(0);
  }

  const hashedPassword = await hash('admin1234', 10);

  const admin = userRepo.create({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'ADMIN',
  });

  await userRepo.save(admin);
  console.log('✅ Admin user seeded successfully');
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error('❌ Failed to seed admin user:', err);
  process.exit(1);
});
