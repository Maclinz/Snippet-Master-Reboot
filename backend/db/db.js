const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}
module.exports = db;