import mongoose from 'mongoose';
import validator from 'validator';

const { Schema } = mongoose;

const ContactSchema = new Schema({
  userId: String,
  contactId: String,
  status: {
    type: Boolean,
    default: false,
    validate(value) {
      if (!validator.isBoolean(value.toString())) {
        throw new Error('status must be true/false');
      }
    },
  },
  createdAt: { type: Number, default: Date.now },
  updatedAt: { type: Number, default: null },
  deletedAt: { type: Number, default: null },
});

ContactSchema.statics = {
  createNew(item) {
    return this.create(item);
  },
};

module.exports = mongoose.model('contact', ContactSchema);
