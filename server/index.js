import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import kpiRoutes from "./src/kpi/routes/kpi.js";
import productRoutes from "./src/product/routes/product.js";
import transactionRoutes from "./src/transaction/routes/transaction.js";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME ONLY OR AS NEEDED 
    Use only for seeding data.js info in DB
    */
    // await mongoose.connection.db.dropDatabase();
    /*
    import { kpis, products, transactions } from "./src/data/data.js";
    import KPI from "./src/kpi/models/KPI.js";
    import Product from "./src/product/models/Product.js";
    import Transaction from "./src/transaction/models/Transaction.js";
    */
    /*
    KPI.insertMany(kpis);
    Product.insertMany(products);
    Transaction.insertMany(transactions);
    */
  })
  .catch((error) => console.log(`${error} did not connect`));
