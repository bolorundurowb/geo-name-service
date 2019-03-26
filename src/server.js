/**
 * Created by bolorundurowb on 2019-03-25
 */

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const routes = require('./routes/Routes');
const Logger = require('./config/Logger');

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes.route(router);
app.use('/v1/', router);

app.use((req, res, next) => {
  res.status(501).send({
    message: 'This API does not support that request.'
  });
  next();
});

app.listen(port, () => Logger.log(`Server started on ${port}`));