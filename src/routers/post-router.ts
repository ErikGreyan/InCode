import { Router } from "express";
// ------ Controller ------
import postController from "../controllers/post-controller";
const router = Router();

router.post(
    "/create",
    postController.create
);

router.get(
    "/view",
    postController.view
);

router.put(
    "/update",
    postController.update
);

router.delete(
    "/delete",
    postController.delete
);

export default router;