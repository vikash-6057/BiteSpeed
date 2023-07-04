const { Router } = require('express');
const { urlencoded, json } = require('express');
const { router: contactRouter } = require('./modules/contact/controller/contact_controller');
const { httpLogger } = require('./middlewares/http_logger')
const apiRouter = Router();
const router = Router();

apiRouter.use(urlencoded({
    extended: true
}));
apiRouter.use(json());
router.use(httpLogger)
router.use('/api/v1', apiRouter);
apiRouter.use('/contacts', contactRouter);

exports.router = router;
