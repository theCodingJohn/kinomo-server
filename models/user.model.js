import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favorite_movies: {
    type: [
      {
        movie: {
          title: String,
          release_date: String,
          backdrop_path: String,
          poster_path: String,
          genres: [
            {
              _id: false,
              id: Number,
              name: String,
            },
          ],
          ids: {
            tmdb: Number,
          },
        },
        _id: false,
      },
    ],
  },
  password_hash: String,
  date_created: {
    type: Date,
    default: Date.now,
  },
  name: String,
  bio: String,
  avatar: String,
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password_hash;
  },
});

schema.plugin(uniqueValidator);

export default mongoose.model("User", schema);
