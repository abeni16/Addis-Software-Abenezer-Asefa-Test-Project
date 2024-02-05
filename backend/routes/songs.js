const express = require("express");
const router = express.Router();
const Song = require("../models/song");

// Create a song
router.post("/", async (req, res) => {
  console.log("req body", req.body);
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a song
router.patch("/:id", async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(song);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a song
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.body, req.params);
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: "Song deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate overall statistics
router.get("/statistics", async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const uniqueArtists = await Song.distinct("artist").countDocuments();
    const uniqueAlbums = await Song.distinct("album").countDocuments();
    const uniqueGenres = await Song.distinct("genre").countDocuments();

    // Additional statistics as per your requirement

    res.json({
      totalSongs,
      uniqueArtists,
      uniqueAlbums,
      uniqueGenres,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
