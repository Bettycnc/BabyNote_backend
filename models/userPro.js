const mongoose = require('mongoose');


const userProSchema = mongoose.Schema({
    //etablissement: {type: String, required: true},
    username: { type: String, required: true, unique: true },
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    password: { type: String, required: true },
    token: String,
});

const UserPro = mongoose.model('userPros', userProSchema);

module.exports = UserPro;