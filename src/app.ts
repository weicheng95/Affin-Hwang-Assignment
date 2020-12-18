import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";
import * as admin from "firebase-admin";
import * as serviceAccount from "../firebase-service-account.json";
import cors from "cors";
import history from "connect-history-api-fallback";

// Controllers (route handlers)
import * as customerController from "./controllers/customer";
const corsOptions = {
  origin: ["http://localhost:8081", "https://msp-dev.boostorium.com", "https://msp-test.boostorium.com", "https://msp-stage.boostorium.com", "https://msp.boost-my.com"],
};
// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, "views"));
app.use(compression());
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

/**
 * API routes.
 */
app.get("/customers/:customerId", customerController.getCustomerById);
app.get("/customers", customerController.getCustomerList);
app.post("/customers", customerController.createCustomer);
app.put("/customers/:customerId", customerController.updateCustomer);
app.delete("/customers/:customerId", customerController.deleteCustomer);

/**
 * Static Page Hosting
 */
console.log(path.join(__dirname, "../../views/dist"));
const staticFileMiddleware = express.static(path.join(__dirname, "../../views/dist"));

app.use(staticFileMiddleware);
app.use(
  history({
    disableDotRule: true,
    verbose: true,
  })
);
app.use(staticFileMiddleware);

app.get("/", (req, res) => {
  res.render(path.join(__dirname, "../../views/dist/index.html"));
});

// initialise firebase
admin.initializeApp({
  credential: admin.credential.cert(<any>serviceAccount),
});

/**
 * Primary app routes.
 */
// app.get("/", homeController.index);
// app.get("/login", userController.getLogin);

export default app;
