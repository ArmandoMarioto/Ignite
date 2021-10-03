import { Router } from "express";

import { PostgresCategoriesRepository } from "../modules/cars/repositories/PostgresCategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new PostgresCategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  createCategoryService.execute({ name, description });
  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();
  return response.status(200).json(all);
});

export { categoriesRoutes };
