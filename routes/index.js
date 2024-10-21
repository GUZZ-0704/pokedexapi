module.exports = app => {
    require("./ability.routes")(app);
    require("./type.routes")(app);
    require("./pokemon.routes")(app);
}