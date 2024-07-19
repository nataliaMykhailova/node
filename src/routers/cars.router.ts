import { Router } from "express";

import { carController } from "../controllers/car.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { createCarSchema, updateCarSchema } from "../validators/car.validators";

const router = Router();

router.get("/", carController.getList);
router.post(
  "/",
  commonMiddleware.isValidCreateDto(createCarSchema),
  carController.create,
);

router.get("/:id", commonMiddleware.isValidId("id"), carController.getOneCar);
router.put(
  "/:id",
  commonMiddleware.isValidId("id"),
  commonMiddleware.isValidUpdateDto(updateCarSchema, [
    "username",
    "age",
    "email",
    "phone",
  ]),
  carController.update,
);
router.delete("/:id", commonMiddleware.isValidId("id"), carController.delete);

export const carsRouter = router;
