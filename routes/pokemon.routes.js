module.exports = app => {
    let router = require("express").Router();
    const controller = require("../controllers/pokemon.controller.js");

    router.get('/search', controller.filterPokemons);
    router.get('/', controller.listPokemon);
    router.get('/:id', controller.getPokemonById);
    //router.get('/evolutions/:id', controller.getEvolutionLine);
    router.get('/stats/:id', controller.calculateStatsAtLevel100);
    router.get('/details/:id', controller.getPokemonDetails);
    router.post('/', controller.createPokemon);
    router.put('/:id/evolution', controller.updateEvolution);
    router.put('/:id', controller.updatePokemonPut);
    router.patch('/:id', controller.updatePokemonPatch);
    router.post('/:id/photo', controller.uploadPicture);
    router.delete('/:id', controller.deletePokemon);

    app.use('/pokemon', router);
};
