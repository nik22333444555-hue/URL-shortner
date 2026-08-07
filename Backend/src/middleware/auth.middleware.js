import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import TryCatch from "../middleware/TryCatch.js";
import UserRepository from "../repository/user.repository.js";
import env from "../config/env.js";


const authMiddleware = TryCatch(async (req, res, next) => {

    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return new ApiError(401, "Access token is missing")
    }

    const decoded = jwt.verify(
        accessToken,
        env.ACCESS_TOKEN_SECRET
    );

    const user = await UserRepository.findById(decoded.id);


    if (!user) {
        throw new ApiError(401, "user not found");
    }

    //check user is active
    if (!user.isActive) {
        throw new ApiError(403, "Account is deactivated");
    }


    req.user = user;
    next();


});

export default authMiddleware;