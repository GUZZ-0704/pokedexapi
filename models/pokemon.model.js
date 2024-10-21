module.exports = (sequelize, Sequelize) => {
    const Pokemon = sequelize.define("pokemon", {
        name: {
            type: Sequelize.STRING
        },
        numPokedex: {
            type: Sequelize.INTEGER
        },
        idAbility: {
            type: Sequelize.INTEGER
        },
        idAbility2: {
            type: Sequelize.INTEGER
        },
        idAbility3: {
            type: Sequelize.INTEGER
        },
        idType: {
            type: Sequelize.INTEGER
        },
        idType2: {
            type: Sequelize.INTEGER
        },
        description: {
            type: Sequelize.STRING
        },
        hp: {
            type: Sequelize.INTEGER
        },
        attack: {
            type: Sequelize.INTEGER
        },
        defense: {
            type: Sequelize.INTEGER
        },
        specialAttack: {
            type: Sequelize.INTEGER
        },
        specialDefense: {
            type: Sequelize.INTEGER
        },
        speed: {
            type: Sequelize.INTEGER
        },
        lvlEvolution: {
            type: Sequelize.INTEGER
        },
        idEvolutionPrev: {
            type: Sequelize.INTEGER
        },
        idEvolutionNext: {
            type: Sequelize.INTEGER
        },
    });
    return Pokemon;
}
