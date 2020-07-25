import expressLoader from './express';
import socketsLoader from './sockets';
import express from 'express';
import mongoose from "./mongoose";
import process from "./process";

const loadersIndex = (expressApp: express.Application) => {
  expressLoader(expressApp);
  socketsLoader();
  mongoose();
  process();
};

export default loadersIndex;
