/* eslint-disable linebreak-style */
const admin = require("firebase-admin");

const serviceAccount = require("./service-account.json");

// 初始化 Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const products = [
  {
    "id": "1",
    "name": "T-shirt Stockholm",
    "color": [
      "red",
      "pink",
      "yellow",
    ],
    "size": [
      "S",
      "M",
      "L",
    ],
    "category": "t-shirt",
    "price": 290,
    "stock": 5,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14372/bastian-ignacio-vega-cani-9UAfLTqMoS0-unsplash__2_.png",
  },
  {
    "id": "2",
    "name": "T-shirt Denmark",
    "color": [
      "red",
      "green",
      "pink",
      "purple",
    ],
    "size": [
      "XS",
      "S",
      "M",
    ],
    "category": "dress",
    "price": 290,
    "stock": 0,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14365/anomaly-WWesmHEgXDs-unsplash.jpg",
  },
  {
    "id": "3",
    "name": "T-shirt Stockholm",
    "color": [
      "red",
      "blue",
      "yellow",
    ],
    "size": [
      "XS",
      "S",
      "L",
    ],
    "category": "hat",
    "price": 290,
    "stock": 10,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14374/faith-yarn-hgtWvsq5e2c-unsplash.png",
  },
  {
    "id": "4",
    "name": "T-shirt Stockholm",
    "color": [
      "blue",
      "pink",
      "yellow",
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
    ],
    "category": "t-shirt",
    "price": 290,
    "stock": 8,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14373/christian-bolt-VW5VjskNXZ8-unsplash.png",
  },
  {
    "id": "5",
    "name": "T-shirt Stockholm",
    "color": [
      "gray",
      "blue",
      "pink",
      "yellow",
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
    ],
    "category": "dress",
    "price": 290,
    "stock": 3,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14372/bastian-ignacio-vega-cani-9UAfLTqMoS0-unsplash__2_.png",
  },
  {
    "id": "6",
    "name": "T-shirt Stockholm",
    "color": [
      "red",
      "blue",
      "pink",
      "purple",
    ],
    "size": [
      "S",
      "M",
    ],
    "category": "t-shirt",
    "price": 290,
    "stock": 7,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14365/anomaly-WWesmHEgXDs-unsplash.jpg",
  },
  {
    "id": "7",
    "name": "T-shirt Stockholm",
    "color": [
      "blue",
      "yellow",
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
    ],
    "category": "t-shirt",
    "price": 290,
    "stock": 5,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14374/faith-yarn-hgtWvsq5e2c-unsplash.png",
  },
  {
    "id": "8",
    "name": "T-shirt Stockholm",
    "color": [
      "red",
      "blue",
      "pink",
      "white",
    ],
    "size": [
      "XS",
      "S",
      "M",
    ],
    "category": "dress",
    "price": 290,
    "stock": 2,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14373/christian-bolt-VW5VjskNXZ8-unsplash.png",
  },
  {
    "id": "9",
    "name": "T-shirt Stockholm",
    "color": [
      "red",
      "white",
      "pink",
      "yellow",
    ],
    "size": [
      "XS",
      "S",
      "L",
    ],
    "category": "skirt",
    "price": 290,
    "stock": 20,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14372/bastian-ignacio-vega-cani-9UAfLTqMoS0-unsplash__2_.png",
  },
  {
    "id": "10",
    "name": "T-shirt Stockholm",
    "color": [
      "red",
      "blue",
      "pink",
      "yellow",
    ],
    "size": [
      "XS",
      "S",
      "L",
    ],
    "category": "dress",
    "price": 290,
    "stock": 6,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14365/anomaly-WWesmHEgXDs-unsplash.jpg",
  },
  {
    "id": "11",
    "name": "T-shirt Stockholm",
    "color": [
      "red",
      "blue",
      "pink",
      "yellow",
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
    ],
    "category": "skirt",
    "price": 290,
    "stock": 15,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14374/faith-yarn-hgtWvsq5e2c-unsplash.png",
  },
  {
    "id": "12",
    "name": "T-shirt Stockholm",
    "color": [
      "red",
      "blue",
      "pink",
      "yellow",
    ],
    "size": [
      "XS",
      "S",
      "M",
      "L",
    ],
    "category": "skirt",
    "price": 290,
    "stock": 10,
    "img": "https://assets-lighthouse.alphacamp.co/uploads/image/file/14373/christian-bolt-VW5VjskNXZ8-unsplash.png",
  },
];

const users = [
  {
    "id": "05fe",
    "username": "sylvia",
    "favorites": [
      "2",
      "1",
    ],
    "cart": [
      {
        "productId": "8",
        "quantity": 2,
      },
      {
        "productId": "10",
        "quantity": 1,
      },
    ],
  },
  {
    "id": "9ea35df7-5e16-4a66-bfc0-da00b8caf105",
    "username": "789",
    "favorites": [
      "1",
      "2",
      "3",
    ],
    "cart": [
      {
        "productId": "3",
        "quantity": 1,
      },
    ],
  },
];

// 將資料插入到 Firestore
const insertProducts = async () => {
  const batch = db.batch();

  products.forEach((product) => {
    const productRef = db.collection("products").doc(product.id);
    batch.set(productRef, product);
  });

  try {
    await batch.commit();
    console.log("Products successfully added to Firestore!");
  } catch (err) {
    console.error("Error adding products: ", err);
  }
};
// 將資料插入到 Firestore
const insertUsers = async () => {
  const batch = db.batch();

  users.forEach((user) => {
    const userRef = db.collection("users").doc(user.id);
    batch.set(userRef, user);
  });

  try {
    await batch.commit();
    console.log("users successfully added to Firestore!");
  } catch (err) {
    console.error("Error adding users: ", err);
  }
};
// insertProducts();
insertUsers();
