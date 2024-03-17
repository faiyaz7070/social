// index.js
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const followerRoutes = require("./routes/followerRoutes");
const schema = require("./graphql/schema");


require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

// Routes
app.use("/auth", authRoutes);
app.use("/post",  postRoutes);
app.use("/follower",  followerRoutes);

// GraphQL Endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
