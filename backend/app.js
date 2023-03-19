require("dotenv").config();
const express = require("express");
// const { sequelize } = require('./db/models');
const config = require("./config/config");
const authRouterApi = require('./routes/api/authRouteApi');
const taskRouter = require("./routes/api/taskRouter");

const app = express();
config(app);
const PORT = process.env.PORT ?? 4000;
app.use('/api', authRouterApi);
app.use('/api/task', taskRouter);

// app.use('/api/line', lineRouterApi);
app.listen(PORT, async () => {
  try {
    // eslint-disable-next-line no-console
    console.log(`Server started at ${PORT} port...`);
    // await sequelize.authenticate();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
});