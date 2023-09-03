const Subscription = require("../model/subscription.model"); // Import your Subscription model here

const {
  isValid,
  isValidObjectId,
  isValidRequestBody,
  isValidDate,
  isPositiveNumber,
} = require("../utils/validations");

// Create a new subscription
const createSubscription = async function (req, res) {
  try {
    let data = req.body;

    if (!isValidRequestBody(data)) {
      return res.status(400).send({ status: false, message: "Data not found" });
    } else {
      const { serviceID, serviceName, monthlyFee, startDate, userID } = data;

      //-----------------------------------------------Validation start from here------------------------------------------------//

      // Validation for serviceID & unique serviceID
      if (!isValid(serviceID)) {
        return res
          .status(400)
          .send({ status: false, message: "Service ID is required" });
      }

      // Validation for serviceName
      if (!isValid(serviceName)) {
        return res
          .status(400)
          .send({ status: false, message: "Service name is required" });
      }

      // Validation for monthlyFee
      if (!isValid(monthlyFee) || !isPositiveNumber(monthlyFee)) {
        return res.status(400).send({
          status: false,
          message: "Monthly fee must be a positive number",
        });
      }

      // Validation for startDate
      if (!isValid(startDate) || !isValidDate(startDate)) {
        return res
          .status(400)
          .send({ status: false, message: "Valid start date is required" });
      }

      // Validation for userID
      if (!isValid(userID)) {
        return res
          .status(400)
          .send({ status: false, message: "User ID is required" });
      }

      // Additional custom validation rules can be added here

      //-----------------------------------------------Validation end here------------------------------------------------//

      // Assuming you have a Subscription model
      const newSubscription = new Subscription(data);
      const savedSubscription = await newSubscription.save();

      return res.status(201).send({
        status: true,
        message: "Subscription created successfully",
        data: savedSubscription,
      });
    }
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Read a Subscription by ID
const readSubscription = async function (req, res) {
  try {
    const subscriptionId = req.params.id; // Assuming you pass the subscription ID in the URL

    if (!isValid(subscriptionId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid subscription ID" });
    }

    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res
        .status(404)
        .send({ status: false, message: "Subscription not found" });
    }

    return res.status(200).send({
      status: true,
      message: "Subscription retrieved successfully",
      data: subscription,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

//Update Subcription by ID
const updateSubscription = async function (req, res) {
  try {
    const subscriptionId = req.params.id; // Assuming you pass the subscription ID in the URL
    const updatedData = req.body;

    if (!isValid(subscriptionId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid subscription ID" });
    }

    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res
        .status(404)
        .send({ status: false, message: "Subscription not found" });
    }

    // Validate and update individual fields
    if (isValid(updatedData.serviceID)) {
      subscription.serviceID = updatedData.serviceID;
    }

    if (isValid(updatedData.serviceName)) {
      subscription.serviceName = updatedData.serviceName;
    }

    if (
      isValid(updatedData.monthlyFee) &&
      isPositiveNumber(updatedData.monthlyFee)
    ) {
      subscription.monthlyFee = updatedData.monthlyFee;
    }

    if (isValid(updatedData.startDate) && isValidDate(updatedData.startDate)) {
      subscription.startDate = updatedData.startDate;
    }

    if (isValid(updatedData.userID)) {
      subscription.userID = updatedData.userID;
    }

    // Save the updated subscription
    const updatedSubscription = await subscription.save();

    return res.status(200).send({
      status: true,
      message: "Subscription updated successfully",
      data: updatedSubscription,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// Delete Subcription
const deleteSubscription = async function (req, res) {
  try {
    const subscriptionId = req.params.id; // Assuming you pass the subscription ID in the URL

    if (!isValid(subscriptionId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invalid subscription ID" });
    }

    const subscription = await Subscription.findByIdAndRemove(subscriptionId);

    if (!subscription) {
      return res
        .status(404)
        .send({ status: false, message: "Subscription not found" });
    }

    return res.status(200).send({
      status: true,
      message: "Subscription deleted successfully",
      data: subscription,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = {
  createSubscription,
  readSubscription,
  updateSubscription,
  deleteSubscription,
};
