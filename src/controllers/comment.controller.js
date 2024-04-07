import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    if (!videoId) {
        throw new ApiError(400, "Video Id is required");
    }

    const pageNumber = parseInt(page);
    const limitOfComments = parseInt(limit);

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    const comments = await Comment.aggregatePaginate(
        Comment.aggregate([
            // Stage 1: Match comments related to the given video
            {
                $match: {
                    video: video._id
                }
            },
            // Stage 2: Perform a lookup to retrieve likes associated with each comment
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "comment",
                    as: "likes"
                }
            },
            // Stage 3: Perform a lookup to retrieve user information for each comment's owner
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "user"
                }
            },
            // Stage 4: Add fields like 'likes', 'isLiked', and 'username' to each comment
            {
                $addFields: {
                    likes: {
                        $size: "$likes" // Calculate the size of the 'likes' array
                    },
                    isLiked: {
                        $in: [req.user?.id, "$likes.likedBy"] // Check if the current user has liked the comment
                    },
                    username: {
                        $arrayElemAt: ["$user.username", 0] // Extract the username from the 'user' array
                    }
                }
            },
            // Stage 5: Project only the necessary fields for the result
            {
                $project: {
                    username: 1,
                    content: 1,
                    likes: 1,
                    createdAt: 1,
                    isLiked: 1
                }
            },
            // Stage 6: Sort comments by createdAt in descending order
            {
                $sort: { createdAt: -1 } // Sort by createdAt in descending order
            }
        ]),
        { page: pageNumber, limit: limitOfComments } // Pagination: Specify page number and limit
    );

    if (comments.length === 0) {
        throw new ApiError(400, "No comments on the video")
    }

    return (
        res
            .status(200)
            .json(new ApiResponse(200, comments, "Comments fetched successfully"))
    )
});

const addComment = asyncHandler(async (req, res) => {

    const { videoId } = req.params
    if (!videoId) {
        throw new ApiError(400, "Invalid videoId")
    }

    const { content } = req.body
    if (!content) {
        throw new ApiError(400, "Content is required")
    }

    const user = await User.findOne(req.user?._id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }
    const video = await Video.findById(videoId)

    if (!video) {
        throw new ApiError(400, "cannot find the video")
    }

    const comment = await Comment.create({
        content: content,
        owner: user._id,
        video: video._id
    })

    if (!comment) {
        throw new ApiError(500, "Error in creating the comment")
    }

    return (
        res
            .status(200)
            .json(new ApiResponse(200, comment, "Commented successfully"))
    )

})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!commentId) {
        throw new ApiError(400, "Cannot find comment id")
    }

    const comment = await Comment.findById(commentId)

    const user = await User.findOne(req.user?._id)

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if (comment?.owner.equals(user._id.toString())) {
        const { content } = req.body
        if (!content) {
            throw new ApiError(400, "Content is required")
        }

        comment.content = content
        await comment.save({ validateBeforeSave: false })

        return (
            res
                .status(200)
                .json(new ApiResponse(200, comment, "comment updated successfully"))
        )
    } else {
        throw new ApiError(400, "Only the owner can update the comment")
    }

})

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!commentId) {
        throw new ApiError(400, "comment Id cant be fetched for params")
    }
    const comment = await Comment.findById(commentId)
    if (!comment) {
        return res.status(404).json(new ApiResponse(404, {}, "Comment not found"));
    }

    const user = await User.findOne(req.user?._id)
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    if (comment?.owner.equals(user._id.toString())) {
        await Comment.findByIdAndDelete(commentId)
        return (
            res
                .status(200)
                .json(new ApiResponse(200, {}, "Comment deleted successfully"))
        )
    } else {
        throw new ApiError(401, "Only user can delete the comment")
    }
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}