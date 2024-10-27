import express from 'express';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import cors from 'cors';
import jsxRender from './utils/jsxRender';
import indexRouter from './routes/indexRouter';
import apiRouter from './routes/apiRouter';
import userRouter from './routes/userRouter';
import resLocals from './middlewares/resLocals';

const PORT = process.env.PORT || 3000;
const app = express();

app.engine('jsx', jsxRender);
app.set('view engine', 'jsx');
app.set('views', path.join(__dirname, 'components', 'pages'));

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(resLocals);
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log(`App has started on port ${PORT}`));
