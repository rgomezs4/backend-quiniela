const Team = require("../models").Team;
const Match = require("../models").Match;
const Prediction = require("../models").Prediction;

module.exports = {
    create(req, res) {
        return Team.create({
            leagueId: req.body.leagueId,
            group: req.body.group,
            name: req.body.name,
            logo: req.body.logo,
            played: req.body.played,
            won: req.body.won,
            tied: req.body.tied,
            lost: req.body.lost,
            points: req.body.points,
            eliminated: req.body.eliminated
        })
            .then(team => res.status(201).send(team))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Team.findAll({
            include: [
                {
                    model: Match,
                    as: "MatchesAsHome"
                },
                {
                    model: Match,
                    as: "MatchesAsAway"
                },
                {
                    model: Match,
                    as: "MatchesWon"
                },
                {
                    model: Prediction,
                    as: "Predictions"
                }
            ]
        })
            .then(teams => res.status(200).send(teams))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Team.findById(req.params.teamId, {
            include: [
                {
                    model: Match,
                    as: "MatchesAsHome"
                },
                {
                    model: Match,
                    as: "MatchesAsAway"
                },
                {
                    model: Match,
                    as: "MatchesWon"
                },
                {
                    model: Prediction,
                    as: "Predictions"
                }
            ]
        })
            .then(team => {
                if (!team) {
                    return res.status(404).send({
                        message: "Team Not Found"
                    });
                }
                return res.status(200).send(team);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Team.findById(req.params.teamId, {
            include: [
                {
                    model: Match,
                    as: "MatchesAsHome"
                },
                {
                    model: Match,
                    as: "MatchesAsAway"
                },
                {
                    model: Match,
                    as: "MatchesWon"
                }
            ]
        })
            .then(team => {
                if (!team) {
                    return res.status(404).send({
                        message: "Team Not Found"
                    });
                }
                return team
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(team)) // Send back the updated team.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Team.findById(req.params.teamId)
            .then(team => {
                if (!team) {
                    return res.status(400).send({
                        message: "Team Not Found"
                    });
                }
                return team
                    .destroy()
                    .then(() =>
                        res.status(204).send({
                            message: `Team ${
                                req.params.teamId
                            } has been deleted`
                        })
                    )
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
