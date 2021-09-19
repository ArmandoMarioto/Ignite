import { Router } from "express";

import { Category } from "../model/Category";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;
  const categoryAlreadyExists = categoriesRepository.findbyName(name);

  if (!categoryAlreadyExists) {
    categoriesRepository.create({ name, description });
    return response.status(201).send();
  }
  return response.status(400).json({ error: "Category already exists" });
});

categoriesRoutes.get("/", (request, response) => {
  const all = categoriesRepository.list();
  return response.status(200).json(all);
});

export { categoriesRoutes };
