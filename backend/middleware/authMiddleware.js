import jwt from "jsonwebtoken";

export async function authMiddlware(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1] 
//   console.log(token)    
  if (!token) {
    return res.status(400).json({
      message: "No token",
    });
  }
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    // console.log(decoded)
    // console.log(req)
    // console.log(res)
    res.username = decoded.username;
  next()
  } catch (error) {
    return res.status(403).json({
        message: "Invalid token"
    });
  }
}
