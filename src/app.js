const express = require('express');
const app = express();
const sequelize = require('./database/db');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.listen(PORT, async function() {
    console.log(`App runining on http://localhost:${PORT}`);

    // Database connection
    //! Force: true -> DROP TABLES
    try {
        await sequelize.sync({ force: true });
        console.log('Database connection successful');
    } catch (error) {
        console.log('Database connection failed', error);
    }
    
});