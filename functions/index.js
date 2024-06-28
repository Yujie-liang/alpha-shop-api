/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
// File: server.js
const express = require("express");
const bodyParser = require("body-parser");
// const fs = require("fs");
// const path = require("path");
const cors = require("cors");
const app = express();
// const port = 3004;
const {v4: uuidv4} = require("uuid");

app.use(bodyParser.json());

const allowedOrigins = ["http://localhost:3000", "https://yujie-liang.github.io"];

const corsOptions = {
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions)); // 使用cors
// Helper function to read data from Firestore collection
const readDataFromFirestore = async (collection) => {
  const snapshot = await db.collection(collection).get();
  return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
};

// Helper function to write data to Firestore collection
const writeDataToFirestore = async (collection, data) => {
  await db.collection(collection).doc(data.id).set(data);
};
// const usersFilePath = path.join(__dirname, "users.json");
// const productsFilePath = path.join(__dirname, "products.json");
// // fs.ensureFileSync(usersFilePath);
// // fs.ensureFileSync(productsFilePath);

// // Helper function to read data from a JSON file
// const readDataFromFile = (filePath) => {
//   try {
//     const data = fs.readFileSync(filePath, "utf8");
//     return JSON.parse(data);
//   } catch (err) {
//     console.error(err);
//     return [];
//   }
// };

// // Helper function to write data to a JSON file
// const writeDataToFile = (filePath, data) => {
//   try {
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
//   } catch (err) {
//     console.error(err);
//   }
// };

// get user by username
app.get("/users", async (req, res) => {
  try {
    const users = await readDataFromFirestore("users");
    if (req.query.username) {
      const user = users.find((u) => u.username === req.query.username);
      if (user) {
        res.json([user]);
      } else {
        res.status(404).send("User not found");
      }
    } else {
      res.json(users);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// create new user
app.post("/users", async (req, res) => {
  const {username, favorites, cart} = req.body;
  try {
    const users = await readDataFromFirestore("users");

    // Check if the user already exists
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    // Create new user
    const newUser = {
      id: uuidv4(), // 使用uuid生成唯一ID
      username,
      favorites,
      cart,
    };

    await writeDataToFirestore("users", newUser);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// PATCH route to update user data
app.patch("/users/:userId", async (req, res) => {
  const {userId} = req.params;
  const {favorites, cart} = req.body;
  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).send("User not found");
    }
    const userData = userDoc.data();
    if (favorites !== undefined) {
      userData.favorites = favorites;
    }
    if (cart !== undefined) {
      userData.cart = cart;
    }
    await userRef.set(userData);
    res.status(200).send(userData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Product routes
// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await readDataFromFirestore("products");
    res.json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const productRef = db.collection("products").doc(req.params.id);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return res.status(404).send("Product not found");
    }
    res.json({id: productDoc.id, ...productDoc.data()});
  } catch (err) {
    res.status(500).send(err.message);
  }
});


// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
exports.api = functions.https.onRequest(app);
