const mongoose = require('mongoose');

// Define the schema for a subscription document
const subscriptionSchema = new mongoose.Schema({

  serviceName: {
    type: String,
    required: true,
  },
  serviceLink: {
    type: String,
  },
  monthlyFee: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true

  }
},{
  timestamps: true
});

// Create the Subscription model using the schema
const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
