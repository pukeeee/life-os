import { AggregateRoot, Guard, Result, UniqueEntityID } from "@backend/shared/kernel";

interface CategoryProps {
  userId: UniqueEntityID;
  name: string;
  icon: string | null;
  color: string | null;
  sortOrder: number;
  createdAt: Date;
}

export interface CreateCategoryProps {
  userId: UniqueEntityID;
  name: string;
  icon?: string | null;
  color?: string | null;
  sortOrder?: number;
  createdAt?: Date;
}

/**
 * Category — сфера життя (Health, Work, Mind…), якою користувач групує метрики.
 * Простий агрегат: впорядкування + візуальні атрибути.
 */
export class Category extends AggregateRoot<CategoryProps> {
  private static readonly MAX_NAME = 60;

  public get userId(): UniqueEntityID {
    return this.props.userId;
  }
  public get name(): string {
    return this.props.name;
  }
  public get icon(): string | null {
    return this.props.icon;
  }
  public get color(): string | null {
    return this.props.color;
  }
  public get sortOrder(): number {
    return this.props.sortOrder;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  private constructor(props: CategoryProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: CreateCategoryProps, id?: UniqueEntityID): Result<Category> {
    const emptyGuard = Guard.againstEmpty(props.name ?? "", "name");
    if (emptyGuard.isFailure) return Result.fail(emptyGuard.getError());
    const lengthGuard = Guard.againstAtMost(this.MAX_NAME, props.name, "name");
    if (lengthGuard.isFailure) return Result.fail(lengthGuard.getError());

    return Result.ok(
      new Category(
        {
          userId: props.userId,
          name: props.name.trim(),
          icon: props.icon ?? null,
          color: props.color ?? null,
          sortOrder: props.sortOrder ?? 0,
          createdAt: props.createdAt ?? new Date(),
        },
        id,
      ),
    );
  }
}
