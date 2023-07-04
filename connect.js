const mongoose = require("mongoose")

const connectdb = async (url) => {
    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log(err);
    })
};

module.exports = connectdb
