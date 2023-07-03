const express = require('express');
require('dotenv').config();
const { router: router } = require('./router')
const { sequelize: sequelize } = require('./config/database')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(router);
sequelize.sync()
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error(error))
app.listen(PORT, () => {
    console.log(`Server started on PORT : ${PORT}`);
})