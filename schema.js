const mongoose = require("mongoose")

const user = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },

    private: [
    {
        category : {
            type: String
        },

        keyword : {
            type: String
        },

        code : {
            type: String
        },
        scope : {
            type: String
        },

        description : {
            type: String
        }

    }
    ] ,

    public : [
    {
        category : {
            type: String
        },

        keyword : {
            type: String
        },

        code : {
            type: String
        },
        scope : {
            type: String
        },

        description : {
            type: String
        }

    }
    ]

})

module.exports = mongoose.model ("user" , user)