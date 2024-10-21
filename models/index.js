const dbConfig = require("../database/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.pokemon = require("./pokemon.model.js")(sequelize, Sequelize);
db.ability = require("./ability.model.js")(sequelize, Sequelize);
db.type = require("./type.model.js")(sequelize, Sequelize);

db.type.hasMany(db.pokemon, { as: "pokemons" });
db.pokemon.belongsTo(db.type, {
    foreignKey: "idType",
    as: "type",
});
db.pokemon.belongsTo(db.type, {
    foreignKey: "idType2",
    as: "type2",
});
db.ability.hasMany(db.pokemon, { as: "pokemons" });
db.pokemon.belongsTo(db.ability, {
    foreignKey: "idAbility",
    as: "ability",
});
db.pokemon.belongsTo(db.ability, {
    foreignKey: "idAbility2",
    as: "ability2",
});
db.pokemon.belongsTo(db.ability, {
    foreignKey: "idAbility3",
    as: "ability3",
});
db.pokemon.belongsTo(db.pokemon, {
    foreignKey: "idEvolutionPrev",
    as: "evolutionPrev",
});
db.pokemon.belongsTo(db.pokemon, {
    foreignKey: "idEvolutionNext",
    as: "evolutionNext",
});

module.exports = db;