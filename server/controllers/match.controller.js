import Match from '../models/match.model.js';
import errorHandler from "./error.controller.js";

const create = async (req, res) => {
    try {
        console.log(req.body);
        const match = new Match(req.body);
        await match.save();
        return res.status(200).json({
            message: "Match created successfully!",
        })
    }
    catch (err) {
        res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const list = async (req, res) => {
    try {
        let matches = await Match.find();
        res.json(matches);
    }
    catch (err) {
        res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
};

const remove = async (req, res) => {
    try {
        let match = req.profile;
        let deletedMatch = await Match.deleteOne(match);
        res.json(deletedMatch);
    }
    catch (err) {
        res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        })
    }
}

const rank = async (req, res) => {
    try {
        let matches = await Match.find().sort({ points: 'descending'});
        res.json(matches);
    }
    catch (err) {
        res.status(400).json({
            error: errorHandler.getErrorMessage(err),
        });
    }
}

export default { create, list, remove, rank };