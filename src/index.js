const express = require('express');
const cors = require('cors');
const app = express();
const router = require('../routes/routes');

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.listen(8080, () => {
    console.log("Running up that 8080 hill");
})

