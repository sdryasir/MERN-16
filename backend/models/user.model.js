import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  postalCode: { type: String },
});

const PaymentInfoSchema = new mongoose.Schema({
  cardHolderName: { type: String },
  cardLast4Digits: { type: String },
  paymentProvider: { type: String }, // e.g. Stripe, PayPal
  providerCustomerId: { type: String },
});

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String, // URL
    },
    role: {
      type: String,
      enum: ['customer', 'admin', 'moderator'],
      default: 'customer',
    },
    address: AddressSchema,

    paymentInfo: PaymentInfoSchema,

    isVerified: {
      type: Boolean,
      default: false,
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],

    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
