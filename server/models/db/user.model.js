import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    names: String,
    email: String,
    password: String
});

const UserModel = mongoose.model('users', userSchema);

export default UserModel;