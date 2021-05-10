import express from "express";
import User from "../models/user.model.js";
import Movie from "../models/movie.model.js";

import catchAsync from "../utils/catchAsync.js";

const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res) => {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  })
);

router.post(
  "/",
  catchAsync(async (req, res) => {
    const { watchedMovie, last_watched_at, username } = req.body;

    const user = await User.findOne({ username }).populate("movies");
    const inUserMovies = user.movies.find(
      (movie) => movie.movie.ids.tmdb === watchedMovie.ids.tmdb
    );

    if (inUserMovies) {
      const foundMovie = await Movie.findById(inUserMovies._id);
      foundMovie.plays = foundMovie.plays + 1;
      foundMovie.last_updated_at = Date.now();

      await foundMovie.save();
      return res.json({ message: "Successfully added" });
    }

    const movie = new Movie({
      plays: 1,
      last_watched_at,
      movie: watchedMovie,
      user,
    });

    const savedMovie = await movie.save();
    user.movies = user.movies.concat(savedMovie);
    await user.save();
    res.json({ message: "Successfully added" });
  })
);

export default router;
