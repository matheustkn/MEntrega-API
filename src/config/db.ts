import mongoose from 'mongoose';

// Essa parte serve para retirar um warning do mongoose e é opcional
mongoose.set('strictQuery', false);

async function main(): Promise<void> {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('🚀 Database connected');
}

main().catch((err) => console.log(err));
