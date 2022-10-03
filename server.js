const app = require('./app');
const mongoose = require("mongoose");
const {DB_HOST, PORT = 3000} = process.env;



mongoose.connect(DB_HOST)
    .then(() => app.listen(process.env.PORT || 3001, () => {
        console.log(`Database connection successful on port ${PORT}`)
    })
    )
    .catch(err => {
        console.error(err)
        process.exit(1)
    });