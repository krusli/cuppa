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

    getEvent: async (req, res, next) => {
        try {
            const meetup = req.meetup;
            meetup.events = meetup.events.filter(x => x._id == req.params.eventId);

            if (!meetup.events) {
                res.status(404).send({
                    error: 'not_found',
                    message: 'event not found in meetup'
                });
            }

            res.send(meetup.events[0]);
        } catch (err) {
            next(err);
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
    },

    newRequiredRole: async (req, res, next) => {
        try {
            const role = req.role;
            const meetup = req.meetup;

            if (!role) {
                res.status(400).send({
                    error: 'bad_request',
                    message: 'Missing param: role (role ObjectId)'
                })
            }

            const events = meetup.events.filter(x => x._id == req.params.eventId);
            if (!events) {
                res.status(400).send({
                    error: 'bad_request',
                    message: 'Invalid URL parameter :eventId'
                });
                return;
            }

            const event = events[0];

            const requiredRolesIds = event.requiredRoles.map(x => x._id.toString());

            // don't push if it's already in it
            if (!requiredRolesIds.includes(role._id.toString())) {
                event.requiredRoles.push(role._id);

                const saved = await meetup.save()
            }

            res.json(event.requiredRoles);
            
        } catch (err) {
            next(err);
        }
    }
}