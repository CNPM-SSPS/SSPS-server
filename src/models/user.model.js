import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { toJSON, paginate } from './plugins/index.js';
import { roles } from '../config/roles.js';

/**
 * @type {mongoose.SchemaDefinitionProperty}
 */
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true // used by the toJSON plugin
    },
    role: {
      type: String,
      enum: roles,
      default: 'user'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
  indexFields: ['deletedAt']
});

userSchema.methods.updateUser = async function (oldPassword, newPassword) {
  const user = this;
  const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid password');
  }
  user.password = newPassword;
  await user.save();
  return user;
};

userSchema.methods.deleteUser = async function (password) {
  const user = this;
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid password');
  }
  await user.delete();
  return user;
};

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

export default User;
