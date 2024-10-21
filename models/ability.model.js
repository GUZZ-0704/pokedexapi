module.exports = (sequelize, Sequelize) => {
    const Ability = sequelize.define("ability", {
        name: {
            type: Sequelize.STRING
        },
    });
    return Ability;
}
