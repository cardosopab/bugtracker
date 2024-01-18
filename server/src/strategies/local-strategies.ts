import passport from "passport";
import { Strategy } from "passport-local";
import User from "../mongoose/schemas/User";
import SerializedUser from "../models/SerializedUser";

import { comparePassword } from "../utils/helpers";

passport.serializeUser((user: SerializedUser, done) => {
  console.log(`Inside Serialize User:`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  console.log(`Inside Deserialize UserId: ${id}`);
  try {
    const findUser = User.findById(id);
    if (!findUser) throw new Error("User Not Found.");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log(`Username: ${username}, Password: ${password}`);
    try {
      const findUser = await User.findOne({ username });

      if (!findUser) throw new Error("User not found.");

      const isPasswordCorrect = comparePassword(password, findUser.password);

      if (!isPasswordCorrect) throw new Error("Invalid Password.");

      done(null, findUser);
    } catch (err) {
      done(err, undefined);
    }
  })
);
