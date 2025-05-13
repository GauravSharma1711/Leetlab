import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addProblemToPlaylist, createPlaylist, deletePlaylist, getAllListDetails, getPlayListDetails, removeProblemFromPlaylist } from "../controllers/playlist.controller.js";


const router = express.Router()

router.get("/" , authMiddleware , getAllListDetails);

router.get("/:playlistId" , authMiddleware , getPlayListDetails);

router.post("/create-playlist" , authMiddleware , createPlaylist);

router.post("/add-problem/:playListId" , authMiddleware , addProblemToPlaylist);

router.delete("/delete/:playListId" , authMiddleware , deletePlaylist);


router.delete("/remove-problem/:playListId" , authMiddleware , removeProblemFromPlaylist)


export default router;