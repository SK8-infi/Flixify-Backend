import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const AccessToken = "helloworld123"

export const verifyJWT = asyncHandler((req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // console.log(token)
        if (!token) {
            throw new ApiError(401, "Unauthorise Request")
        }
        const decodedToken = jwt.verify(token, AccessToken)

        const user = User.findOne(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid AccessToken")
        }
        // console.log(user)
        req.user = user
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid AccessToken")
    }

})