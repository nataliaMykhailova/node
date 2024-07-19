import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import {
  createUserSchema,
  updateUserSchema,
} from "../validators/user.validators";

const router = Router();

router.get("/", userController.getList);
router.post(
  "/",
  commonMiddleware.isValidCreateDto(createUserSchema),
  userController.create,
);

router.get("/:id", commonMiddleware.isValidId("id"), userController.getOneUser);
router.put(
  "/:id",
  commonMiddleware.isValidId("id"),
  commonMiddleware.isValidUpdateDto(updateUserSchema, [
    "username",
    "age",
    "email",
    "phone",
  ]),
  userController.update,
);
router.delete("/:id", commonMiddleware.isValidId("id"), userController.delete);

export const userRouter = router;
