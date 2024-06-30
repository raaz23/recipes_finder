import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
  const token = req.cookies.access_token;
  //console.log(token);

  if (!token) {
    console.log("error in access token", token);
    return res.status(401).json({ message: "Unauthorized! Please login first." });
  }


  if (!token) {
    console.log("Error in access token", token);
    return res.status(401).json({ message: "Unauthorized! Please login first." });
  }

  try {
    jwt.verify(token, "MYNAMEISRAJUYADAV20SCSE1010854", (err, user) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        return res.status(401).json({ message: "Unauthorized! Invalid token." });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    console.error("JWT verification catch block error:", err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};
export default verifyJWT;
