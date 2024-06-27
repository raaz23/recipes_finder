import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  const token =req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized! Please login first." });
  }

  try {
    jwt.verify(token, "receiyfoodmernStack12345", (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized! Please register first." });
      }

      req.user = decode;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export default verifyJWT;
