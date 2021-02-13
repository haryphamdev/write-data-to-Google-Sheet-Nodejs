import express from "express";
import homepageController from "../controllers/homepageController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homepageController.getHomepage);
    router.get("/excel", homepageController.getGoogleSheet)
    return app.use("/", router);
};

module.exports = initWebRoutes;