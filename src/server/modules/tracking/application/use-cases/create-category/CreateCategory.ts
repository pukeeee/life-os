import {
  Result,
  UnexpectedError,
  UniqueEntityID,
  UseCase,
  UseCaseError,
  ValidationError,
} from "@server/shared/kernel";
import { Category } from "../../../domain/category/Category";
import type { ICategoryRepository } from "../../../domain/category/ICategoryRepository";

export interface CreateCategoryRequest {
  userId: string;
  name: string;
  icon?: string | null;
  color?: string | null;
  sortOrder?: number;
}
export interface CreateCategoryResponse {
  categoryId: string;
}

type Response = Result<CreateCategoryResponse, UseCaseError>;

/** Створює нову категорію (сферу життя) користувача. */
export class CreateCategory implements UseCase<CreateCategoryRequest, Response> {
  constructor(private readonly categories: ICategoryRepository) {}

  public async execute(request: CreateCategoryRequest): Promise<Response> {
    try {
      const categoryOrError = Category.create({
        userId: new UniqueEntityID(request.userId),
        name: request.name,
        icon: request.icon ?? null,
        color: request.color ?? null,
        sortOrder: request.sortOrder ?? 0,
      });
      if (categoryOrError.isFailure) {
        return Result.fail(ValidationError.create(categoryOrError.getError()));
      }

      const category = categoryOrError.getValue();
      await this.categories.save(category);
      return Result.ok({ categoryId: category.id.toString() });
    } catch (err) {
      return Result.fail(UnexpectedError.create(err));
    }
  }
}
