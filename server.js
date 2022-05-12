import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { infoLogger } from './logger.js';
import { errorLogger } from './logger.js';

const app = express();

import mainPageRoutes from './routes/FrontPage.js';
import userRoutes from './routes/User.js';
import roomRoutes from './routes/Room.js';
import activityRoutes from "./routes/activityRoutes.js"

Sentry.init({
    dsn: "https://7d2fa9f19dde4a25867cad95616ba29a@o1240255.ingest.sentry.io/6392296",
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(bodyParser.json({limit: "30mb", exntended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", exntended: true}));
app.use(cors());

app.use("/", mainPageRoutes);
app.use("/activity", activityRoutes);
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);

// The error handler must be before any other error middleware and after all controllers
app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        // Capture all 401 and 500 errors
        if (error.status === 401 || error.status === 500) {
          return true;
        }
        return false;
      },
    })
  );

const CONNECTION_URL = process.env.Mongodb_URL;
const PORT = process.env.PORT | 4000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => {infoLogger.info(`Server connected on port: ${PORT}`)}))
    .catch((error) => errorLogger.error(`Error occurrent while starting server: ${error.message}`));


export default app;