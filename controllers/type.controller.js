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
exports.listType = async (req, res) => {
    try {
        const types = await db.type.findAll(
            {
                include: ['pokemons']
            }
        );
        res.json(types);
    } catch (error) {
        sendError500(error, res);
    }
};


exports.getTypeById = async (req, res) => {
    const id = req.params.id;
    try {
        const type = await getTypeOr404(id, res);
        if (!type) {
            return;
        }
        res.json(type);
    } catch (error) {
        sendError500(error, res);
    }
}

exports.createType = async (req, res) => {

    const requiredFields = ['name'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

        const type = {
            name: req.body.name,
        }
        const typeCreada = await db.type.create(type);

        res.status(201).json(typeCreada);
    } catch (error) {
        sendError500(error, res);
    }
}
exports.updateTypePatch = async (req, res) => {
    const id = req.params.id;
    try {
        const type = await getTypeOr404(id, res);
        if (!type) {
            return;
        }
        type.name = req.body.name || type.name;
        await type.save();
        res.json(type);
    } catch (error) {
        sendError500(error, res);
    }
}
exports.updateTypePut = async (req, res) => {
    const id = req.params.id;
    try {
        const type = await getTypeOr404(id, res);
        if (!type) {
            return;
        }
        const requiredFields = ['name'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        type.name = req.body.name;
        type.birthdate = req.body.birthdate;

        await type.save();

        res.json(type);
    } catch (error) {
        sendError500(error, res);
    }
}
exports.deleteType = async (req, res) => {
    const id = req.params.id;
    try {
        const type = await getTypeOr404(id, res);
        if (!type) {
            return;
        }
        await type.destroy();
        res.json({
            msg: 'Type eliminada correctamente'
        });
    } catch (error) {
        sendError500(error, res);
    }
}

async function getTypeOr404(id, res) {
    const type = await db.type.findByPk(id,
        {
            include: ['pokemons']
        });

    if (!type) {
        res.status(404).json({
            msg: 'Type no encontrada'
        });
        return;
    }

    return type;
}
