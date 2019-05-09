import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/cuppa-meetups', { useNewUrlParser: true })
//   .then(() => console.log('Connected to MongoDB'), err => console.log(err));

/**
 * Contents microservice.
 *
 * Point of contact for the SPA (except for auth, which goes directly to auth servers).
 *
 * Aggregates contents from the different services for presentation on the client.
 * Also handles client services and forwards them to the right server(s).
 */

const sendData = (req: Request, res: Response) => res.json(req.data);

import middleware from "./middleware";
app.get("/groups/", middleware.getGroups, sendData);
app.get("/groups/:groupId", middleware.getGroup, sendData);

// TODO move to controllers
import GroupsService from "../common/groups";
const getGroup = GroupsService.getGroup;
const joinGroup = GroupsService.joinGroup;

/* Join a group */
app.post("/me/groups", async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.group) {
    res.status(400).send({
      error: "bad_request",
      message: "Missing parameter: group (ObjectId)"
    });
  }

  try {
    const groupId = req.body.group;
    const group = await getGroup(req, res, groupId);
    const joined = await joinGroup(req, res, group._id);
    res.json(joined);
  } catch (err) {
    // console.error(err); // TODO use unified error handler
    next(err);
  }
});

app.get("/communities/featured", (req: Request, res: Response) => {
  res.json([
    {
      name: "Writing"
    },
    {
      name: "DIY"
    },
    {
      name: "Mech Keys"
    },
    {
      name: "Headphones"
    },
    {
      name: "Manga"
    },
    {
      name: "Anime"
    }
  ]);
});

app.listen(3003, () => {
  // tslint:disable-next-line:no-console
  console.log("Server listening on port 3003.");
});
