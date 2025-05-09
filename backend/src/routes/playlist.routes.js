import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playlist.controller.js";


const router = express.Router()

router.get("/" , authMiddleware , getAllListDetails);

router.get("/:playlistId" , authMiddleware , getPlayListDetails);

router.post("/create-playlist" , authMiddleware , createPlaylist);

router.post("/:playlistId/add-problem" , authMiddleware , addProblemToPlaylist);

router.delete("/:playlistId" , authMiddleware , deletePlaylist);


router.delete("/:playlistId/remove-problem" , authMiddleware , removeProblemFromPlaylist)


export default router;