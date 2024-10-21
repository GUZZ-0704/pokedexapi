const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor
exports.listAbility = async (req, res) => {
    try {
        const abilitys = await db.ability.findAll(
            {
                include: ['pokemons']
            }
        );
        res.json(abilitys);
    } catch (error) {
        sendError500(error, res);
    }
};


exports.getAbilityById = async (req, res) => {
    const id = req.params.id;
    try {
        const ability = await getAbilityOr404(id, res);
        if (!ability) {
            return;
        }
        res.json(ability);
    } catch (error) {
        sendError500(error, res);
    }
}

exports.createAbility = async (req, res) => {

    const requiredFields = ['name'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

        const ability = {
            name: req.body.name,
        }
        const abilityCreada = await db.ability.create(ability);

        res.status(201).json(abilityCreada);
    } catch (error) {
        sendError500(error, res);
    }
}
exports.updateAbilityPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const ability = await getAbilityOr404(id, res);
        if (!ability) {
            return;
        }
        ability.name = req.body.name || ability.name;
        await ability.save();
        res.json(ability);
    } catch (error) {
        sendError500(error, res);
    }
}
exports.updateAbilityPut = async (req, res) => {
    const id = req.params.id;
    try {
        const ability = await getAbilityOr404(id, res);
        if (!ability) {
            return;
        }
        const requiredFields = ['name'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        ability.name = req.body.name;
        ability.birthdate = req.body.birthdate;

        await ability.save();

        res.json(ability);
    } catch (error) {
        sendError500(error, res);
    }
}
exports.deleteAbility = async (req, res) => {
    const id = req.params.id;
    try {
        const ability = await getAbilityOr404(id, res);
        if (!ability) {
            return;
        }
        await ability.destroy();
        res.json({
            msg: 'Ability eliminada correctamente'
        });
    } catch (error) {
        sendError500(error, res);
    }
}

async function getAbilityOr404(id, res) {
    const ability = await db.ability.findByPk(id,
        {
            include: ['pokemons']
        });

    if (!ability) {
        res.status(404).json({
            msg: 'Ability no encontrada'
        });
        return;
    }

    return ability;
}
