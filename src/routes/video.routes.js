import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
    deleteVideo,
    getAllVideos,
    getVideoById,
    publishVideo,
    togglePublishStatus,
    updateVideoDetails
} from "../controllers/video.controller.js";

const router = Router();

router.route("/publishVideo").post(
    verifyJWT,
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1
        },
        {
            name: "thumbnail",
            maxCount: 1
        }
    ]),
    publishVideo
)

router.route("/getAllVideos").get(getAllVideos)
router.route("/:videoId").get(verifyJWT, getVideoById)
router.route("/updateVideo/:videoId").post(verifyJWT, upload.single("thumbnail"), updateVideoDetails)
router.route("/deleteVideo/:videoId").delete(verifyJWT, deleteVideo)
router.route("/togglePublishStatus/:videoId").post(verifyJWT, togglePublishStatus)


export default router