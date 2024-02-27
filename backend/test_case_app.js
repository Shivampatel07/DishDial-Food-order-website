const mongoose = require("mongoose");

require("dotenv").config();

beforeEach(async () => {
  await mongoose.connect(process.env.TEST_MONGO_URL).then(() => {
      console.log('Test DB connected')
  }).catch((err) => {
      console.log(err)
    })
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });