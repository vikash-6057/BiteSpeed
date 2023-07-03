const { Router } = require('express');

const router = Router();

router.post('/identify', async (req, res, next) => {
    try {
        const { phone, email } = req.body
        console.log(phone, email);
        res.send('success').status(200);
    } catch (error) {
        console.error(error);
    }
})
exports.router = router;