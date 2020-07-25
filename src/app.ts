import express from 'express';
import loaders from './loaders';
import config from './config';

const app = express();

loaders(app);

app.listen(config.get('port'), () => {
  console.log(`App running on http://localhost:${config.get('port')}`);
});
