import passport from "passport";
import { Strategy } from "passport-local";
import User from "../mongoose/schemas/User";
import SerializedUser from "../models/SerializedUser";
import { comparePassword } from "../utils/helpers";

passport.serializeUser((user: SerializedUser, done) => {
  console.log("serializedUser", user);
  done(null, { _id: user._id, role: user.role });
});

passport.deserializeUser(async (serializedUser: any, done) => {
  try {
    // TODO: passport using id, instead of _id
    const id = serializedUser._id;
    console.log("deserializedUser", id, serializedUser);
    const findUser = await User.findById(id).exec();
    if (!findUser) throw new Error("User Not Found.");

    done(null, findUser);
  } catch (err) {
    console.log(err);
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    {
      usernameField: "email",
    },
    async (username, password, done) => {
      try {
        const findUser = await User.findOne({ email: username });
        if (!findUser) throw new Error("User not found.");

        const isPasswordCorrect = comparePassword(password, findUser.password);
        if (!isPasswordCorrect) throw new Error("Invalid Password.");

        done(null, findUser);
      } catch (err) {
        console.log(err);
        done(err, undefined);
      }
    }
  )
);
