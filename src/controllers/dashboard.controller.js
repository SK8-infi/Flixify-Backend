import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const getChannelVideos = asyncHandler(async (req, res) => {
    try {

        const user = await User.findById(req.user?._id);
        if (!user) {
            throw new ApiError(400, "User not found.");
        }

        const videos = await Video.find({
            owner: user._id
        })
        if (!videos) {
            throw new ApiError(404, "No videos found for the channel.");
        }
        if (videos.length === 0) {
            return res.status(200).json(new ApiResponse(200, "No videos available."));
        }

        return (
            res
                .status(200)
                .json(new ApiResponse(200, videos, "Videos fetched successfully"))
        )

    } catch (error) {
        console.log(error)
        throw new ApiError(401, error?.message || "Something went wrong while getting channel videos.")

    }
})


const getChannelStats = asyncHandler(async (req, res) => {
    try {

        const user = await User.findById(req.user?._id);
        if (!user) {
            throw new ApiError(400, "User not found.");
        }

        const totalVideos = await Video.find({
            owner: user._id
        })
        const totalSubscribers = await Subscription.find({
            channel: user._id
        })
        const totalLikes = await Like.find({
            likedBy: user._id
        })
        const totalVideoViews = await Video.aggregate([
            {
                $match: {
                    owner: user._id
                }
            },
            {
                $group: {
                    _id: null,
                    totalViews: {
                        $sum: "$views"
                    }
                }
            }
        ])

        return (
            res
                .status(200)
                .json(new ApiResponse(200, {
                    totalVideoViews: totalVideoViews[0]?.totalViews || 0,
                    totalVideos,
                    totalSubscribers,
                    totalLikes
                }, "Channel stats fetched successfully"))
        )

    } catch (error) {
        console.log(error)
        throw new ApiError(401, error?.message || "Something went wrong while getting channel stats.")
    }
})

export {
    getChannelVideos,
    getChannelStats
}