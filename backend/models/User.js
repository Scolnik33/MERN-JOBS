import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    favorities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    company: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }],
    speciality: String,
    avatar: String,
    role: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('User', UserSchema)