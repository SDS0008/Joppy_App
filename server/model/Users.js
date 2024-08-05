const mongoose = require("mongoose");

//Schema And model Are different...


//create Table in the  DataBase Based on Data given Below
const userDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

//Tabel Stored in this below Variable
const UsersData = mongoose.model('UsersData', userDataSchema);


//Export the Variable
module.exports = UsersData;