
module.exports = {
    getTeams: async (req, res) => {
        res.json(req.meetup.teams);
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
    }
}