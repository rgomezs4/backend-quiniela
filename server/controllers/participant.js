const Participant = require("../models").Participant;
const Prediction = require("../models").Prediction;

module.exports = {
    create(req, res) {
        return Participant.create({
            leagueId: req.body.leagueId,
            userId: req.body.userId,
            authorized: req.body.authorized,
            role: req.body.role,
            teamName: req.body.teamName,
            score: req.body.score
        })
            .then(participant => res.status(201).send(participant))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Participant.findAll({
            include: [
                {
                    model: Prediction,
                    as: "Predictions"
                }
            ]
        })
            .then(participants => res.status(200).send(participants))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Participant.findById(req.params.participantId, {
            include: [
                {
                    model: Prediction,
                    as: "Predictions"
                }
            ]
        })
            .then(participant => {
                if (!participant) {
                    return res.status(404).send({
                        message: "Participant Not Found"
                    });
                }
                return res.status(200).send(participant);
            })
            .catch(error => res.status(400).send(error));
    },
    checkIfBelongsToLeague(req, res) {
        return Participant.findAll({
            where: {
                userId: request.params.userId,
                leagueId: request.params.leagueId
            }
        })
            .then(participant => {
                if (!participant) {
                    return res.status(404).send({
                        message: "Participant Not Found"
                    });
                }
                return res.status(200).send(participant);
            })
            .catch(error => res.status(400).send(error));
    },
    getPredictionByMatch(req, res) {
        return Participant.findById(req.params.participantId, {
            include: [
                {
                    model: Prediction,
                    as: "Predictions",
                    where: {
                        matchId: req.params.matchId
                    }
                }
            ]
        })
            .then(participant => {
                if (!participant) {
                    return res.status(404).send({
                        message: "Participant Not Found"
                    });
                }
                return res.status(200).send(participant);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Participant.findById(req.params.participantId, {
            include: [
                {
                    model: Prediction,
                    as: "Predictions"
                }
            ]
        })
            .then(participant => {
                if (!participant) {
                    return res.status(404).send({
                        message: "Participant Not Found"
                    });
                }
                return participant
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(participant)) // Send back the updated participant.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Participant.findById(req.params.participantId)
            .then(participant => {
                if (!participant) {
                    return res.status(400).send({
                        message: "Participant Not Found"
                    });
                }
                return participant
                    .destroy()
                    .then(() =>
                        res.status(204).send({
                            message: `Participant ${
                                req.params.participantId
                            } has been deleted`
                        })
                    )
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
