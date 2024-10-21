module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/type.controller.js");

    router.get('/', controller.listType);
    router.get('/:id', controller.getTypeById);
    router.post('/', controller.createType);
    router.put('/:id', controller.updateTypePut);
    router.patch('/:id', controller.updateTypePatch);
    router.delete('/:id', controller.deleteType);
    app.use('/type', router);

};