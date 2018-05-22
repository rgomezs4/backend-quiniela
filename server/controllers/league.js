const League = require("../models").League;
const Participant = require("../models").Participant;
const Team = require("../models").Team;
const Match = require("../models").Match;
const Stadium = require("../models").Stadium;

module.exports = {
    create(req, res) {
        return League.create({
            name: req.body.name,
            type: req.body.type,
            fee: req.body.fee,
            phase: req.body.phase
        })
            .then(league => res.status(201).send(league))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return League.findAll({
            include: [
                {
                    model: Participant,
                    as: "Participants"
                },
                {
                    model: Team,
                    as: "Teams"
                },
                {
                    model: Match,
                    as: "Matches"
                },
                {
                    model: Stadium,
                    as: "Stadiums"
                }
            ]
        })
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return League.findById(req.params.leagueId, {
            include: [
                {
                    model: Participant,
                    as: "Participants"
                },
                {
                    model: Team,
                    as: "Teams"
                },
                {
                    model: Match,
                    as: "Matches"
                },
                {
                    model: Stadium,
                    as: "Stadiums"
                },
                ,
                {
                    model: Stadium,
                    as: "Stadiums"
                }
            ]
        })
            .then(league => {
                if (!league) {
                    return res.status(404).send({
                        message: "League Not Found"
                    });
                }
                return res.status(200).send(league);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return League.findById(req.params.leagueId, {
            include: [
                {
                    model: Participant,
                    as: "Participants"
                },
                {
                    model: Team,
                    as: "Teams"
                },
                {
                    model: Match,
                    as: "Matches"
                },
                {
                    model: Stadium,
                    as: "Stadiums"
                }
            ]
        })
            .then(league => {
                if (!league) {
                    return res.status(404).send({
                        message: "League Not Found"
                    });
                }
                return league
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(league)) // Send back the updated league.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return League.findById(req.params.leagueId)
            .then(league => {
                if (!league) {
                    return res.status(400).send({
                        message: "League Not Found"
                    });
                }
                return league
                    .destroy()
                    .then(() =>
                        res.status(204).send({
                            message: `League ${
                                req.params.leagueId
                            } has been deleted`
                        })
                    )
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
