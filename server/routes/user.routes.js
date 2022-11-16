import express from "express";
import UserController from "../controllers/user.controllers";

const routes = express();

routes.post('/signup', UserController.signup);
routes.post('/signin', UserController.signIn);
routes.post('/profile', UserController.profile);

export default routes;
