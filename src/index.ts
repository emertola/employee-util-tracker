import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import './utils/connect-db';
import routes from './routes';
import './strategies/local.strategy';

dotenv.config();

const app = express();
const PORT = process.env.HOST_PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({ secret: 'session123', resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Running express server on PORT ${PORT}`));
