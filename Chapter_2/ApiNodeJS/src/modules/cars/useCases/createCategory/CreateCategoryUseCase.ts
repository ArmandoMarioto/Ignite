import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}
/**
 * [x] - Definir o tipo de retorno
 * [x] - Alterar o retorno de error de
 * [x] - Acessar o repositorio
 */

class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}
  execute({ description, name }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error(`Category ${name} already exists`);
    }
    this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
