import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validators";

const router = Router();

router.get("/", userController.getList);

router.get("/:id", commonMiddleware.isValidId("id"), userController.getOneUser);
router.put(
  "/:id",
  authMiddleware.checkAccessToken,
  commonMiddleware.isValidId("id"),
  commonMiddleware.isValidUpdateDto(UserValidator.updateUser, [
    "username",
    "age",
    "email",
    "phone",
  ]),
  userController.update,
);
router.delete("/:id", commonMiddleware.isValidId("id"), userController.delete);

export const userRouter = router;
