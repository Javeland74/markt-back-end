const express = require('express');
const app = express();
const router = require('../routes/routes');

app.use(express.json());

app.use('/api', router);

app.listen(8080, () => {
    console.log("Running up that 8080 hill");
})

