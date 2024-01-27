import { ApiError } from "../utils/ApiError";
// import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const AccessToken = "helloworld123"
const RefreshToken = "helloWorld123"

export const verifyJWT = asyncHandler((req, res, next) => {

    try {
        const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            throw new ApiError(401, "Unauthorise Request")
        }
        const decodedToken = jwt.verify(token, AccessToken)
        const user = User.findOne(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid AccessToken")
        }

        req.user = user
        next()


    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid AccessToken")
    }

})