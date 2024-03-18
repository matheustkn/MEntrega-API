import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

setTimeout(async () => {
  async function main(): Promise<void> {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('🚀 Database connected');
  }
  main().catch((err) => console.log(err));
}, 1000);
