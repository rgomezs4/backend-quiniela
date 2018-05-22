const Match = require("../models").Match;
const Prediction = require("../models").Prediction;
const Participant = require("../models").Participant;

module.exports = {
    create(req, res) {
        return Match.create({
            leagueId: req.body.leagueId,
            team1: req.body.team1,
            team2: req.body.team2,
            stadiumId: req.body.stadiumId,
            winner: req.body.winner,
            resultTeam1: req.body.resultTeam1,
            resultTeam2: req.body.resultTeam2
        })
            .then(match => res.status(201).send(match))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Match.findAll({
            include: [
                {
                    model: Prediction,
                    as: "Predictions"
                }
            ]
        })
            .then(matches => res.status(200).send(matches))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Match.findById(req.params.matchId, {
            include: [
                {
                    model: Prediction,
                    as: "Predictions"
                }
            ]
        })
            .then(match => {
                if (!match) {
                    return res.status(404).send({
                        message: "Match Not Found"
                    });
                }
                return res.status(200).send(match);
            })
            .catch(error => res.status(400).send(error));
    },
    finishMatch(req, res) {
        return Match.findById(req.params.matchId, {
            include: [
                {
                    model: Prediction,
                    as: "Predictions"
                }
            ]
        })
            .then(match => {
                if (!match) {
                    return res.status(404).send({
                        message: "Match Not Found"
                    });
                }
                let points = [];

                match.Predictions.forEach(prediction => {
                    let score = 0;
                    if (prediction.winnerTeam === req.body.winner) {
                        score = 1;
                    }

                    if (
                        prediction.resultTeam1 === req.body.resultTeam1 &&
                        prediction.resultTeam2 === req.body.resultTeam2
                    ) {
                        score = 3;
                    }

                    points.push({
                        score: score,
                        participantId: prediction.participantId
                    });
                });

                points.forEach(points => {
                    return Participant.findById(points.participantId).then(
                        participant => {
                            participant.score += points.score;
                            participant
                                .update(participant, {
                                    fields: Object.keys(participant)
                                })
                                .catch(error => res.status(400).send(error));
                        }
                    );
                });

                req.body.is_completed = 1;

                return match
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(match)) // Send back the updated match.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Match.findById(req.params.matchId, {
            include: [
                {
                    model: Prediction,
                    as: "Predictions"
                }
            ]
        })
            .then(match => {
                if (!match) {
                    return res.status(404).send({
                        message: "Match Not Found"
                    });
                }
                return match
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(match)) // Send back the updated match.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Match.findById(req.params.matchId)
            .then(match => {
                if (!match) {
                    return res.status(400).send({
                        message: "Match Not Found"
                    });
                }
                return match
                    .destroy()
                    .then(() =>
                        res.status(204).send({
                            message: `Match ${
                                req.params.matchId
                            } has been deleted`
                        })
                    )
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
