const db = require("../models");
const { isRequestValid, sendError500, getVideoId } = require("../utils/request.utils");
const { sequelize } = require('../models');
const { Op } = require('sequelize');
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor
exports.listPokemon = async (req, res) => {
    try {
        const pokemons = await db.pokemon.findAll({
            include: [
                {
                    model: db.type,
                    as: 'type',
                },
                {
                    model: db.type,
                    as: 'type2',
                },
                {
                    model: db.ability,
                    as: 'ability',
                },
                {
                    model: db.ability,
                    as: 'ability2',
                },
                {
                    model: db.ability,
                    as: 'ability3',
                },
                {
                    model: db.pokemon,
                    as: 'evolutionPrev',
                },
                {
                    model: db.pokemon,
                    as: 'evolutionNext',
                },
            ]
        });
        res.json(pokemons);
    } catch (error) {
        sendError500(error, res);
    }
};



exports.getPokemonById = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        res.json(pokemon);
    } catch (error) {
        sendError500(error, res);
    }
}

exports.createPokemon = async (req, res) => {
    const requiredFields = ['name', 'numPokedex', 'idAbility', 'idAbility2', 'idType', 'description', 'hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed', 'lvlEvolution'];
    
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const pokemon = {
            name: req.body.name,
            numPokedex: req.body.numPokedex,
            idAbility: req.body.idAbility,
            idAbility2: req.body.idAbility2,
            idType: req.body.idType,
            description: req.body.description,
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense,
            specialAttack: req.body.specialAttack,
            specialDefense: req.body.specialDefense,
            speed: req.body.speed,
            lvlEvolution: req.body.lvlEvolution,
        };

        if (req.body.idType2) {
            pokemon.idType2 = req.body.idType2;
        }
        if (req.body.idAbility3) {
            pokemon.idAbility3 = req.body.idAbility3;
        }

        const pokemonCreada = await db.pokemon.create(pokemon);

        res.status(201).json(pokemonCreada);
    } catch (error) {
        sendError500(error, res);
    }
};
exports.updatePokemonPatch = async (req, res) => {
    const id = req.params.id;

    const requiredFields = ['name', 'numPokedex', 'idAbility', 'idAbility2', 'idType', 'description', 'hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed', 'lvlEvolution'];

    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }

    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }

        pokemon.name = req.body.name || pokemon.name;
        pokemon.numPokedex = req.body.numPokedex || pokemon.numPokedex;
        pokemon.idAbility = req.body.idAbility || pokemon.idAbility;
        pokemon.idAbility2 = req.body.idAbility2 || pokemon.idAbility2;
        pokemon.idType = req.body.idType || pokemon.idType;
        pokemon.description = req.body.description || pokemon.description;
        pokemon.hp = req.body.hp || pokemon.hp;
        pokemon.attack = req.body.attack || pokemon.attack;
        pokemon.defense = req.body.defense || pokemon.defense;
        pokemon.specialAttack = req.body.specialAttack || pokemon.specialAttack;
        pokemon.specialDefense = req.body.specialDefense || pokemon.specialDefense;
        pokemon.speed = req.body.speed || pokemon.speed;
        pokemon.lvlEvolution = req.body.lvlEvolution || pokemon.lvlEvolution;

        if (req.body.idType2) {
            pokemon.idType2 = req.body.idType2;
        }
        if (req.body.idAbility3) {
            pokemon.idAbility3 = req.body.idAbility3;
        }
        
        await pokemon.save();

        res.json(pokemon);
    } catch (error) {
        sendError500(error, res);
    }
};

exports.updatePokemonPut = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        const requiredFields = ['name', 'numPokedex', 'idAbility', 'idAbility2', 'idType', 'description', 'hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed', 'lvlEvolution'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        
        pokemon.name = req.body.name;
        pokemon.numPokedex = req.body.numPokedex;
        pokemon.idAbility = req.body.idAbility;
        pokemon.idAbility2 = req.body.idAbility2;
        pokemon.idType = req.body.idType;
        pokemon.description = req.body.description;
        pokemon.hp = req.body.hp;
        pokemon.attack = req.body.attack;
        pokemon.defense = req.body.defense;
        pokemon.specialAttack = req.body.specialAttack;
        pokemon.specialDefense = req.body.specialDefense;
        pokemon.speed = req.body.speed;
        pokemon.lvlEvolution = req.body.lvlEvolution;

        if (req.body.idType2) {
            pokemon.idType2 = req.body.idType2;
        }
        if (req.body.idAbility3) {
            pokemon.idAbility3 = req.body.idAbility3;
        }

        await pokemon.save();

        res.json(pokemon);
    } catch (error) {
        sendError500(error, res);
    }
}
exports.deletePokemon = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        await pokemon.destroy();
        res.json({
            msg: 'Pokemon eliminada correctamente'
        });
    } catch (error) {
        sendError500(error, res);
    }
}
exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.photo;
        const fileName = pokemon.id + '.jpg';
        file.mv(`public/pokemon/${fileName}`);
        await pokemon.save();
        res.json(pokemon);
    } catch (error) {
        sendError500(error, res);
    }
}



exports.updateEvolution = async (req, res) => {
    const id = req.params.id;
    const { idEvolutionPrev, idEvolutionNext } = req.body;

    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }

        if (idEvolutionPrev) {
            const prevPokemon = await db.pokemon.findByPk(idEvolutionPrev);
            if (!prevPokemon) {
                return res.status(404).json({ msg: 'Evolución previa no encontrada' });
            }
            pokemon.idEvolutionPrev = idEvolutionPrev;
        }

        if (idEvolutionNext) {
            const nextPokemon = await db.pokemon.findByPk(idEvolutionNext);
            if (!nextPokemon) {
                return res.status(404).json({ msg: 'Evolución siguiente no encontrada' });
            }
            pokemon.idEvolutionNext = idEvolutionNext;
        }

        await pokemon.save();

        if (idEvolutionPrev) {
            const prevPokemon = await db.pokemon.findByPk(idEvolutionPrev);
            if (prevPokemon) {
                prevPokemon.idEvolutionNext = pokemon.id;
                await prevPokemon.save();
            }
        }

        if (idEvolutionNext) {
            const nextPokemon = await db.pokemon.findByPk(idEvolutionNext);
            if (nextPokemon) {
                nextPokemon.idEvolutionPrev = pokemon.id;
                await nextPokemon.save();
            }
        }

        res.json(pokemon);
    } catch (error) {
        sendError500(error, res);
    }
};

exports.filterPokemons = async (req, res) => {
    try {
        const { search, type } = req.query;

        const whereConditions = {};

        if (search && search.trim()) {
            whereConditions[Op.or] = [
                { name: { [Op.like]: `%${search}%` } },
                { numPokedex: search }
            ];
        }

        const typeCondition = type ? {
            [Op.or]: [
                { idType: { [Op.eq]: sequelize.literal(`(SELECT id FROM types WHERE name LIKE '%${type}%')`) } },
                { idType2: { [Op.eq]: sequelize.literal(`(SELECT id FROM types WHERE name LIKE '%${type}%')`) } }
            ]
        } : {};
        const pokemons = await db.pokemon.findAll({
            where: {
                ...whereConditions,
                ...typeCondition
            },
            include: [
                {
                    model: db.type,
                    as: 'type',
                },
                {
                    model: db.type,
                    as: 'type2',
                },
                {
                    model: db.ability,
                    as: 'ability',
                },
                {
                    model: db.ability,
                    as: 'ability2',
                },
                {
                    model: db.ability,
                    as: 'ability3',
                },
                {
                    model: db.pokemon,
                    as: 'evolutionPrev',
                },
                {
                    model: db.pokemon,
                    as: 'evolutionNext',
                }
            ],
        });

        res.json(pokemons);
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        sendError500(error, res);
    }
};


function calcularHP(baseStat, iv, ev, nivel) {
    return Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * nivel) / 100) + nivel + 10;
}

function calcularStat(baseStat, iv, ev, nivel, naturaleza) {
    return Math.floor((Math.floor(((2 * baseStat + iv + Math.floor(ev / 4)) * nivel) / 100) + 5) * naturaleza);
}

exports.calculateStatsAtLevel100 = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }

        const nivel = 100; // Nivel máximo
        const ivMax = 31;  // Valor individual máximo
        const ivMin = 0;   // Valor individual mínimo
        const evMax = 252; // Valor de esfuerzo máximo para una estadística
        const evMin = 0;   // Valor de esfuerzo mínimo
        const naturaleza = 1; // Suponiendo que no haya modificación por naturaleza

        const stats = {
            hp: {
                min: calcularHP(pokemon.hp, ivMin, evMin, nivel),
                max: calcularHP(pokemon.hp, ivMax, evMax, nivel)
            },
            attack: {
                min: calcularStat(pokemon.attack, ivMin, evMin, nivel, naturaleza),
                max: calcularStat(pokemon.attack, ivMax, evMax, nivel, naturaleza)
            },
            defense: {
                min: calcularStat(pokemon.defense, ivMin, evMin, nivel, naturaleza),
                max: calcularStat(pokemon.defense, ivMax, evMax, nivel, naturaleza)
            },
            specialAttack: {
                min: calcularStat(pokemon.specialAttack, ivMin, evMin, nivel, naturaleza),
                max: calcularStat(pokemon.specialAttack, ivMax, evMax, nivel, naturaleza)
            },
            specialDefense: {
                min: calcularStat(pokemon.specialDefense, ivMin, evMin, nivel, naturaleza),
                max: calcularStat(pokemon.specialDefense, ivMax, evMax, nivel, naturaleza)
            },
            speed: {
                min: calcularStat(pokemon.speed, ivMin, evMin, nivel, naturaleza),
                max: calcularStat(pokemon.speed, ivMax, evMax, nivel, naturaleza)
            }
        };

        res.json(stats);
    } catch (error) {
        sendError500(error, res);
    }
};

exports.getPokemonDetails = async (req, res) => {
    const id = req.params.id;
    try {
        const pokemon = await getPokemonOr404(id, res);
        if (!pokemon) {
            return;
        }

        const evolutionLine = [];
        let previousEvolution = pokemon.evolutionPrev;
        while (previousEvolution) {
            evolutionLine.unshift({
                name: previousEvolution.name,
                lvlEvolution: previousEvolution.lvlEvolution,
                imageUrl: `http://localhost:3000/pokemon/${previousEvolution.id}.jpg`
            });
            previousEvolution = await db.pokemon.findByPk(previousEvolution.idEvolutionPrev);
        }

        evolutionLine.push({
            name: pokemon.name,
            lvlEvolution: pokemon.lvlEvolution,
            imageUrl: `http://localhost:3000/pokemon/${pokemon.id}.jpg`
        });

        let nextEvolution = pokemon.evolutionNext;
        while (nextEvolution) {
            evolutionLine.push({
                name: nextEvolution.name,
                lvlEvolution: nextEvolution.lvlEvolution,
                imageUrl: `http://localhost:3000/pokemon/${nextEvolution.id}.jpg`
            });
            nextEvolution = await db.pokemon.findByPk(nextEvolution.idEvolutionNext);
        }

        const nivel = 100;
        const ivMax = 31;
        const evMax = 252;
        const naturaleza = 1;
        const stats = {
            hp: {
                min: calcularHP(pokemon.hp, 0, 0, nivel),
                max: calcularHP(pokemon.hp, ivMax, evMax, nivel)
            },
            attack: {
                min: calcularStat(pokemon.attack, 0, 0, nivel, naturaleza),
                max: calcularStat(pokemon.attack, ivMax, evMax, nivel, naturaleza)
            },
            defense: {
                min: calcularStat(pokemon.defense, 0, 0, nivel, naturaleza),
                max: calcularStat(pokemon.defense, ivMax, evMax, nivel, naturaleza)
            },
            specialAttack: {
                min: calcularStat(pokemon.specialAttack, 0, 0, nivel, naturaleza),
                max: calcularStat(pokemon.specialAttack, ivMax, evMax, nivel, naturaleza)
            },
            specialDefense: {
                min: calcularStat(pokemon.specialDefense, 0, 0, nivel, naturaleza),
                max: calcularStat(pokemon.specialDefense, ivMax, evMax, nivel, naturaleza)
            },
            speed: {
                min: calcularStat(pokemon.speed, 0, 0, nivel, naturaleza),
                max: calcularStat(pokemon.speed, ivMax, evMax, nivel, naturaleza)
            }
        };

        res.json({
            pokemon: {
                ...pokemon.toJSON(),
                imageUrl: `http://localhost:3000/pokemon/${pokemon.id}.jpg`
            },
            evolutionLine,
            stats
        });
    } catch (error) {
        sendError500(error, res);
    }
};

async function getPokemonOr404(id, res) {
    const pokemon = await db.pokemon.findByPk(id, {
        include: [
                {
                    model: db.type,
                    as: 'type',
                },
                {
                    model: db.type,
                    as: 'type2',
                },
                {
                    model: db.ability,
                    as: 'ability',
                },
                {
                    model: db.ability,
                    as: 'ability2',
                },
                {
                    model: db.ability,
                    as: 'ability3',
                },
                {
                    model: db.pokemon,
                    as: 'evolutionPrev',
                },
                {
                    model: db.pokemon,
                    as: 'evolutionNext',
                },
            ]
    });

    if (!pokemon) {
        res.status(404).json({
            msg: 'Pokemon no encontrada'
        });
        return;
    }

    return pokemon;
}

