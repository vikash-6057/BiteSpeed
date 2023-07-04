const express = require('express');
require('dotenv').config();
const { router: router } = require('./router');
const { sequelize: sequelize } = require('./config/database');
const { logger } = require('./middlewares/logger');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(router);
sequelize.sync()
    .then(() => logger.info('Connected to database'))
    .catch((error) => logger.error(error))
app.listen(PORT, () => {
    logger.info(`Server started on PORT : ${PORT}`);
})