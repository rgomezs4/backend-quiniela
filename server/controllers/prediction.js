const Prediction = require("../models").Prediction;

module.exports = {
    create(req, res) {
        return Prediction.create({
            participantId: req.body.participantId,
            matchId: req.body.matchId,
            winnerTeam: req.body.winnerTeam,
            resultTeam1: req.body.resultTeam1,
            resultTeam2: req.body.resultTeam2
        })
            .then(prediction => res.status(201).send(prediction))
            .catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Prediction.findAll()
            .then(predictions => res.status(200).send(predictions))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res) {
        return Prediction.findById(req.params.predictionId)
            .then(prediction => {
                if (!prediction) {
                    return res.status(404).send({
                        message: "Prediction Not Found"
                    });
                }
                return res.status(200).send(prediction);
            })
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        return Prediction.findById(req.params.predictionId)
            .then(prediction => {
                if (!prediction) {
                    return res.status(404).send({
                        message: "Prediction Not Found"
                    });
                }
                return prediction
                    .update(req.body, { fields: Object.keys(req.body) })
                    .then(() => res.status(200).send(prediction)) // Send back the updated prediction.
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    destroy(req, res) {
        return Prediction.findById(req.params.predictionId)
            .then(prediction => {
                if (!prediction) {
                    return res.status(400).send({
                        message: "Prediction Not Found"
                    });
                }
                return prediction
                    .destroy()
                    .then(() =>
                        res.status(204).send({
                            message: `Prediction ${
                                req.params.predictionId
                            } has been deleted`
                        })
                    )
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }
};
