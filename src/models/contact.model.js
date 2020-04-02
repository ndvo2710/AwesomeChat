import mongoose from 'mongoose';
import validator from 'validator';

let Schema = mongoose.Schema;

let ContactSchema = new Schema({
    userId: String,
    contactId: String,
    status: {
        type: Boolean,
        default: false,
        validate(value) {
            if(!validator.isBoolean(value)) {
                throw new Error('status must be true/false');
            }
        }
    },
    createdAt: {type: Number, default: Date.now},
    updatedAt: {type: Number, default: null},
    deletedAt: {type: Number, default: null}
});

module.exports = mongoose.model('contact', ContactSchema);