const User = require("../models").User;
const Participant = require("../models").Participant;

module.exports = {
    create(req, res) {
        return User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name
        })
            .then(user => res.status(201).send(user))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return User.findAll({
            include: [
                {
                    model: Participant,
                    as: "Participants"
                }
            ]
        })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return User.findById(req.params.userId, {
            include: [
                {
                    model: Participant,
                    as: "Participants"
                }
            ]
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User Not Found"
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    checkIfBelongsToLeague(req, res) {
        return User.findById(req.params.userId, {
            include: [
                {
                    model: Participant,
                    as: "Participants"
                }
            ]
        })
            .then(user => {
                let belongs = false;
                if (!user) {
                    return res.status(404).send({
                        message: "User Not Found"
                    });
                }
                user.Participants.some(participant => {
                    if (participant.leagueId === req.params.leagueId) {
                        belongs = true;
                        return belongs;
                    }
                });
                return res.status(200).send(belongs);
            })
            .catch(error => res.status(400).send(error));
    },
    login(req, res) {
        let where = {
            where: { email: req.params.email, password: req.params.password }
        };
        return User.findAll(where)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "Incorrect username or password"
                    });
                }
                return res.status(200).send(user);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return User.findById(req.params.userId, {
            include: [
                {
                    model: Participant,
                    as: "Participants"
                }
            ]
        })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User Not Found"
                    });
                }
                return user
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(user)) // Send back the updated user.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return User.findById(req.params.userId)
            .then(user => {
                if (!user) {
                    return res.status(400).send({
                        message: "User Not Found"
                    });
                }
                return user
                    .destroy()
                    .then(() =>
                        res.status(204).send({
                            message: `User ${
                                req.params.userId
                            } has been deleted`
                        })
                    )
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
