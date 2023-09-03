const express = require('express');
const router = express.Router()
const {
    createSubscription,
    readSubscription,
    updateSubscription,
    deleteSubscription,
  } = require("../controller/subcription.controller")

router.post('/', createSubscription)
router.get('/:id', readSubscription)
router.put('/:id', updateSubscription)
router.delete('/:id', deleteSubscription)


module.exports = router