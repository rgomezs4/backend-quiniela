const Stadium = require("../models").Stadium;
const Match = require("../models").Match;

module.exports = {
    create(req, res) {
        return Stadium.create({
            leagueId: req.body.leagueId,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        })
            .then(stadium => res.status(201).send(stadium))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Stadium.findAll({
            include: [
                {
                    model: Match,
                    as: "Matches"
                }
            ]
        })
            .then(stadiums => res.status(200).send(stadiums))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Stadium.findById(req.params.stadiumId, {
            include: [
                {
                    model: Match,
                    as: "Matches"
                }
            ]
        })
            .then(stadium => {
                if (!stadium) {
                    return res.status(404).send({
                        message: "Stadium Not Found"
                    });
                }
                return res.status(200).send(stadium);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Stadium.findById(req.params.stadiumId, {
            include: [
                {
                    model: Match,
                    as: "Matches"
                }
            ]
        })
            .then(stadium => {
                if (!stadium) {
                    return res.status(404).send({
                        message: "Stadium Not Found"
                    });
                }
                return stadium
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(stadium)) // Send back the updated stadium.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Stadium.findById(req.params.stadiumId)
            .then(stadium => {
                if (!stadium) {
                    return res.status(400).send({
                        message: "Stadium Not Found"
                    });
                }
                return stadium
                    .destroy()
                    .then(() =>
                        res.status(204).send({
                            message: `Stadium ${
                                req.params.stadiumId
                            } has been deleted`
                        })
                    )
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
