import mongoose from "mongoose";

const schema = new mongoose.Schema({
  plays: Number,
  last_watched_at: Date,
  last_updated_at: {
    type: Date,
    default: Date.now,
  },
  movie: {
    title: String,
    release_date: String,
    backdrop_path: String,
    poster_path: String,
    genres: [
      {
        id: Number,
        name: String,
      },
    ],
    ids: {
      tmdb: Number,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default mongoose.model("Movie", schema);
