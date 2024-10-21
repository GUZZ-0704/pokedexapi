module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/ability.controller.js");

    router.get('/', controller.listAbility);
    router.get('/:id', controller.getAbilityById);
    router.post('/', controller.createAbility);
    router.put('/:id', controller.updateAbilityPut);
    router.patch('/:id', controller.updateAbilityPatch);
    router.delete('/:id', controller.deleteAbility);
    app.use('/ability', router);

};