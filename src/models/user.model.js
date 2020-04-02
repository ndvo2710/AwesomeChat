import mongoose from 'mongoose';
import validator from 'validator';

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true},
    gender: {type: String, default: 'male'},
    phone: {
        type: Number,
        default: null,
        validate(value) {
            if (!validator.isMobilePhone(value)) {
                throw new Error('Mobile Phone is invalid!');
            }
        }
    },
    address: {type: String, default: null},
    avatar: {type: String, default: 'avatar-default.jpg'},
    role: {type: String, default: 'user'},
    local: {
        email: {
            type: String,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid!');
                }
            }
        },
        password: String,
        isActive: {type: Boolean, default: false},
        verifyToken: String
    },
    facebook: {
        uid: String,
        token: String,
        email: {
            type: String,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid!');
                }
            }
        }
    },
    google: {
        uid: String,
        token: String,
        email: {
            type: String,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid!');
                }
            }
        }
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

module.exports = mongoose.model("user", UserSchema);