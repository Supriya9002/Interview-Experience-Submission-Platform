

import jwt from "jsonwebtoken";
import AdminModel from "./../admin/admin.schema.js";

const jwtAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    console.log("In JwtAuth token", token);

    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }

    console.log("JWT_SECRET", process.env.JWT_SECRET);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await AdminModel.findOne({ _id: payload.userID, sessions: token });
    if (!admin) {
      return res.status(401).send("Unauthorized: Invalid token or user does not exist");
    }

    req.userID = payload.userID;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("Unauthorized: Invalid token");
  }
};

export default jwtAuth;

