import User from "../models/user.model.js";

const initialUsers = [
  {
    username: "codingjohn",
    password: "thehardestpassword",
    email: "codingjohn@gmail.com",
  },
  {
    username: "roxena",
    password: "selflove",
    email: "roxena@gmail.com",
  },
  {
    username: "janedoe",
    password: "trytoguessmypassword",
    email: "janedoe@gmail.com",
  },
];

const usersInDB = async () => await User.find({});

export default {
  initialUsers,
  usersInDB,
};
