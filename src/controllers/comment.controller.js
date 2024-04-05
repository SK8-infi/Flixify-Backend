import { User } from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res, next) => { })

const getUserChannelSubscribers = asyncHandler(async (req, res, next) => { })

const getSubscribedChannels = asyncHandler(async (req, res, next) => { })

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}