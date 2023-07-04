const { Router } = require('express');
const contactService = require('../service/contact_service');
const { formatResponse } = require('../../../utils/utils');
const router = Router();
router.post('/identify', async (req, res, next) => {
    try {
        const contact = await contactService.identify(req.body);
        const response = formatResponse(contact)
        res.send(response).status(200);
    } catch (error) {
        res.status(400).send(error.message);
    }
})
exports.router = router;