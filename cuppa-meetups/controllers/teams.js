
const getUserMe = require('../../common/interservice').getUserMe;

module.exports = {
    getTeams: async (req, res) => {
        res.json(req.meetup.teams);
    },

    getTeam: async (req, res) => {
        // TODO more validation
        const matches = req.meetup.teams.filter(x => x._id == req.params.teamId);
        res.json(matches[0]);
    },

    newTeam: async (req, res, next) => {
        const name = req.body.name;
        if (!name) {
            res.status(400).send({
                error: 'bad_request',
                message: 'missing param: name'
            });
        }

        try {
            const meetup = req.meetup;
            // now authenticated, can add a new team
            meetup.teams.push({
                name
            })
            const meetupSaved = await meetup.save();

            res.status(201).location(`/meetups/${meetup._id}/teams`).json(meetupSaved.teams);
        } catch (error) {
            next(error);
        }
    },

    deleteTeam: async (req, res, next) => {
        try {
            const meetup = req.meetup;
            meetup.teams = meetup.teams.filter(x => x._id != req.params.teamId);

            await meetup.save();
            res.send();
        } catch (err) {
            next(err);
        }
    },

    // TODO newrolesAndUsers
    newrolesAndUsers: async (req, res, next) => {
        try {
            const meetup = req.meetup;
            const teams = meetup.teams.filter(x => x._id == req.params.teamId);
            if (!teams) {
                res.status(404).send(); // TODO object
            }

            const team = teams[0];
            const role = req.role;

            if (!team.rolesAndUsers.map(x => x.role._id.toString())
                .includes(role._id.toString())) {
                team.rolesAndUsers.push({
                    role: role._id,
                    users: []
                });
            }

            const meetupSaved = await meetup.save();
            res.send(team.rolesAndUsers);
        } catch (err) {
            next(err);
        }
    },

    newTeamMember: async (req, res, next) => {
        try {
            const meetup = req.meetup;
            const teams = meetup.teams.filter(x => x._id == req.params.teamId);
            if (!teams) {
                res.status(404).send(); // TODO object
            }

            const team = teams[0];

            const role = req.role;
            // TODO assumption role already exists

            const rolesAndUsersMatching = team.rolesAndUsers.filter(x => x.role.toString() == role._id.toString());
            if (!rolesAndUsersMatching) {
                res.status(400).send(); // TODO object
            }

            const rolesAndUsers = rolesAndUsersMatching[0];
            const me = await getUserMe(req, res);

            if (!rolesAndUsers.users.map(x => x.toString()).includes(me._id.toString())) {
                rolesAndUsers.users.push(me._id);
            }

            // save the meetup (we modified it)
            const meetupSaved = await meetup.save();
            res.send(rolesAndUsers);
        } catch (err) {
            next(err);
        }
    }
}