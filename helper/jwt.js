const jwt = require("jsonwebtoken");

require("dotenv").config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const jwtTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);

    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      console.log(err);
      if (err) throw new Error(error);
    });
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};

const jwtRefreshTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);
    const refresh_token = req.headers["authorization"].replace("Bearer ", "");
    jwt.verify(refresh_token, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new Error(error);

      req.user = decoded;
      req.user.refresh_token = refresh_token;
      delete req.user.exp;
      delete req.user.iat;
    });
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

const jwtGenerateToken = (sub, payload) => {
  const accessToken = jwt.sign({ sub: sub, payload }, ACCESS_TOKEN_SECRET, {
    expiresIn: "3m",
    algorithm: "HS512",
  });

  return accessToken;
};

const jwtGenerateRefreshToken = (sub, payload) => {
  const refreshToken = jwt.sign({ sub: sub, payload }, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
    algorithm: "HS512",
  });

  return refreshToken;
};

module.exports = {
  jwtTokenValidate,
  jwtRefreshTokenValidate,
  jwtGenerateToken,
  jwtGenerateRefreshToken,
};
