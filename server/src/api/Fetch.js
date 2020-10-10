const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.json({
        text: "heloo from api"
    });
});

module.exports = router;
