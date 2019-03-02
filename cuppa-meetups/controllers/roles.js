const Role = require('../models/role');

module.exports = {
    newRole: async (req, res, next) => {
        // TODO verify token
        try {
            if (!req.body.name) {
                res.status(400).send({
                    error: 'bad_request',
                    message: 'missing param: name'
                });
            }

            const role = await Role.create({
                name: req.body.name
            });

            res.json(role);
        } catch (err) {
            next(err);
        }
    },

    getRoles: async (req, res) => {
        const roles = await Role.find();
        res.json(roles);
    }
}