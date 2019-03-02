module.exports = {
    getEvents: async (req, res) => {
        res.json(req.meetup.events);
    },

    newEvent: async (req, res, next) => {
        const name = req.body.name;
        if (!name) {
            res.status(400).send({
                error: 'bad_request',
                message: 'missing param: name'
            });
        }

        try {
            const meetup = req.meetup;
            const dateStart = req.body.dateStart;

            if (!dateStart) {
                res.status(400).send({
                    error: 'bad_request',
                    message: 'missing param: dateStart'
                });
            }

            // now authenticated, can add a new team
            meetup.events.push({
                name,
                dateStart
            })
            const meetupSaved = await meetup.save();

            res.status(201).location(`/meetups/${meetup._id}/teams`).json(meetupSaved.events);
        } catch (error) {
            next(error);
        }
    },

    deleteEvent: async (req, res, next) => {
        try {
            const meetup = req.meetup;
            meetup.events = meetup.events.filter(x => x._id != req.params.eventId);

            await meetup.save();
            res.send();
        } catch (err) {
            next(err);
        }
    }
}