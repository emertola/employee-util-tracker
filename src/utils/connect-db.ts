import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/employee-util-db')
  .then(() => console.log('Connected to the database!'))
  .catch((error) => console.log(`Error: ${error}`));

export default mongoose;
