const mongoose = require("mongoose")

const mongodbUrl="mongodb+srv://adminmainak:2211335369@cluster0.2zzmrz4.mongodb.net/?retryWrites=true&w=majority";

const connectDb = () => {
    return mongoose.connect(mongodbUrl);
}

module.exports = {connectDb}