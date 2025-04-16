import express from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";

import Lab5 from './Lab5/index.js';
import cors from 'cors';
import Hello from './Hello.js';
import UserRoutes from './Kambaz/Users/routes.js';
import CourseRoutes from './Kambaz/Courses/routes.js';
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from './Kambaz/Assignment/routes.js';
import EnrollmentsRoutes from './Kambaz/Enrollments/routes.js';
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(cors({
    credentials: true,
    origin: process.env.NETLIFY_URL ||  "http://localhost:5173",
}));
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
  };

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
    sessionOptions.store= MongoStore.create({
      mongoUrl: process.env.MONGO_CONNECTION_STRING, 
      collectionName: 'sessions',
  }),
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
  

app.use(session(sessionOptions));
app.use(express.json());
Hello(app) 
Lab5(app) 
UserRoutes(app)
CourseRoutes(app)
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentsRoutes(app);
app.listen(process.env.PORT || 4000)