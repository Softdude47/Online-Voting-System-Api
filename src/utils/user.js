import jwt from "jsonwebtoken";

export const getCurrentUser = async (req, dbFunction, subKey = "sub") => {
  // console.log(req.user);
  const subject = jwt.verify(req.user, process.env.SECRET_KEY)[subKey];
  console.log({ subject });
  return await dbFunction(subject, false);
};
