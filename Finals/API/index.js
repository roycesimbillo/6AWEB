// This file is saved inside the 'api' folder.

const express = require("express");
const { MongoClient } = require("mongodb");
const dns = require("dns");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());

const CONNECTION_STRING ="mongodb://localhost:27017/";

const DATABASENAME = "MyDb";
let database;

// Middleware instantiation
app.use((req, res, next) => {
  if (!database) {
    return res.status(503).json({ error: "Database not connected yet." });
  }
  next();
});

console.log("Starting API...");
console.log("Connecting to MongoDB...");

async function start() {
  try {
    // Create client with timeouts so you see errors quickly
    const client = new MongoClient(CONNECTION_STRING, {
      serverSelectionTimeoutMS: 10000, // 10s
      connectTimeoutMS: 10000,
    });

    await client.connect();

    database = client.db(DATABASENAME);
    console.log("Yay! Now connected to Cluster");

    app.listen(5038, () => {
      console.log("Server running on http://localhost:5038");
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

start();

// ROUTES TO ALL METHODS

// Get all books
app.get("/api/books/GetBooks", async (req, res) => {
  try {
    const result = await database.collection("Books").find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// Add a book
app.post("/api/books/AddBook", multer().none(), async (req, res) => {
  try {
    console.log("Received body:", req.body); // <-- check what backend gets

    const numOfDocs = await database.collection("Books").countDocuments();

    await database.collection("Books").insertOne({
      id: String(numOfDocs + 1),
      title: req.body.title || "No title",
      desc: req.body.description || "",
      price: Number(req.body.price) || 0,
      author: req.body.author || "Unknown",
      genre: req.body.genre || "Unknown",
      publishedYear: Number(req.body.publishedYear) || new Date().getFullYear(),
    });

    res.json("Added Successfully");
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Failed to add book" });
  }
});

// Delete book
app.delete("/api/books/DeleteBook", async (req, res) => {
  try {
    await database.collection("Books").deleteOne({ id: req.query.id });
    res.json("Deleted successfully!");
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Failed to delete book" });
  }
});

// Update book
app.post("/api/books/UpdateBook", multer().none(), async (req, res) => {
  try {
    const { id, title, description, price, author, genre, publishedYear } = req.body;

    await database.collection("Books").updateOne(
      { id },
      {
        $set: {
          title,
          desc: description,
          price: Number(price) || 0,
          author,
          genre,
          publishedYear: Number(publishedYear) || new Date().getFullYear(),
        },
      }
    );

    res.json("Updated successfully!");
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ error: "Failed to update book" });
  }
});

// Get all motorcycles
app.get("/api/motorcycles/GetMotorcycles", async (req, res) => {
  try {
    const result = await database.collection("Motorcycles").find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error fetching motorcycles:", error);
    res.status(500).json({ error: "Failed to fetch motorcycles" });
  }
});

// Add a motorcycle
app.post("/api/motorcycles/AddMotorcycle", multer().none(), async (req, res) => {
  try {
    console.log("Received motorcycle body:", req.body);
    const numOfDocs = await database.collection("Motorcycles").countDocuments();
    await database.collection("Motorcycles").insertOne({
      id: String(numOfDocs + 1),
      brand: req.body.brand || "Unknown",
      model: req.body.model || "",
      year: Number(req.body.year) || new Date().getFullYear(),
      type: req.body.type || "",
      engineCapacity: req.body.engineCapacity || "",
      color: req.body.color || "Black",
      hasABS: req.body.hasABS === "true",
      hasQuickShifter: req.body.hasQuickShifter === "true",
      features: req.body.features ? JSON.parse(req.body.features) : [],
    });
    res.json("Motorcycle added successfully");
  } catch (error) {
    console.error("Error adding motorcycle:", error);
    res.status(500).json({ error: "Failed to add motorcycle" });
  }
});

// Update motorcycle
app.put("/api/motorcycles/UpdateMotorcycle", multer().none(), async (req, res) => {
  try {
    const { id, brand, model, year, type, engineCapacity, color, hasABS, hasQuickShifter, features } = req.body;
    await database.collection("Motorcycles").updateOne(
      { id },
      {
        $set: {
          brand: brand || "Unknown",
          model: model || "",
          year: Number(year) || new Date().getFullYear(),
          type: type || "",
          engineCapacity: engineCapacity || "",
          color: color || "Black",
          hasABS: hasABS === "true",
          hasQuickShifter: hasQuickShifter === "true",
          features: features ? JSON.parse(features) : [],
        },
      }
    );
    res.json("Motorcycle updated successfully");
  } catch (error) {
    console.error("Error updating motorcycle:", error);
    res.status(500).json({ error: "Failed to update motorcycle" });
  }
});

// Delete motorcycle
app.delete("/api/motorcycles/DeleteMotorcycle", async (req, res) => {
  try {
    await database.collection("Motorcycles").deleteOne({ id: req.query.id });
    res.json("Motorcycle deleted successfully!");
  } catch (error) {
    console.error("Error deleting motorcycle:", error);
    res.status(500).json({ error: "Failed to delete motorcycle" });
  }
});