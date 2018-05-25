const usersController = require("../controllers").users;
const leaguesController = require("../controllers").leagues;
const teamsController = require("../controllers").teams;
const stadiumsController = require("../controllers").stadiums;
const participantsController = require("../controllers").participants;
const matchesController = require("../controllers").matches;
const predictionsController = require("../controllers").predictions;

module.exports = app => {
    app.get("/api", (req, res) =>
        res.status(200).send({
            message: "Welcome to the Todos API!"
        })
    );

    // Users CRUD routes
    app.post("/api/users", usersController.create);
    app.get("/api/users", usersController.list);
    app.get("/api/users/:userId", usersController.retrieve);
    app.put("/api/users/:userId", usersController.update);
    app.delete("/api/users/:userId", usersController.destroy);
    app.get("/api/users/login/:email/:password", usersController.login);
    app.get("/api/users/belongsToLeague/:userId/:leagueId", usersController.checkIfBelongsToLeague);

    // Leagues CRUD routes
    app.post("/api/leagues", leaguesController.create);
    app.get("/api/leagues", leaguesController.list);
    app.get("/api/leagues/:leagueId", leaguesController.retrieve);
    app.put("/api/leagues/:leagueId", leaguesController.update);
    app.delete("/api/leagues/:leagueId", leaguesController.destroy);

    // Teams CRUD routes
    app.post("/api/teams", teamsController.create);
    app.get("/api/teams", teamsController.list);
    app.get("/api/teams/:teamId", teamsController.retrieve);
    app.put("/api/teams/:teamId", teamsController.update);
    app.delete("/api/teams/:teamId", teamsController.destroy);

    // Stadiums CRUD routes
    app.post("/api/stadiums", stadiumsController.create);
    app.get("/api/stadiums", stadiumsController.list);
    app.get("/api/stadiums/:stadiumId", stadiumsController.retrieve);
    app.put("/api/stadiums/:stadiumId", stadiumsController.update);
    app.delete("/api/stadiums/:stadiumId", stadiumsController.destroy);

    // Participants CRUD routes
    app.post("/api/participants", participantsController.create);
    app.get("/api/participants", participantsController.list);
    app.get("/api/participants/:participantId", participantsController.retrieve);
    app.put("/api/participants/:participantId", participantsController.update);
    app.delete("/api/participants/:participantId", participantsController.destroy);
    app.get("/api/participants/getPredictionByMatch/:participantId/:matchId", participantsController.getPredictionByMatch);
    
    // Stadiums CRUD routes
    app.post("/api/matches", matchesController.create);
    app.get("/api/matches", matchesController.list);
    app.get("/api/matches/:matchId", matchesController.retrieve);
    app.put("/api/matches/finishMatch/:matchId", matchesController.finishMatch);
    app.put("/api/matches/:matchId", matchesController.update);
    app.delete("/api/matches/:matchId", matchesController.destroy);
    
    // Stadiums CRUD routes
    app.post("/api/predictions", predictionsController.create);
    app.get("/api/predictions", predictionsController.list);
    app.get("/api/predictions/:predictionId", predictionsController.retrieve);
    app.put("/api/predictions/:predictionId", predictionsController.update);
    app.delete("/api/predictions/:predictionId", predictionsController.destroy);
};
