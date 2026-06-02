import { UniqueEntityID } from "./UniqueEntityID";

/**
 * Базова сутність (Entity) у термінах DDD: обʼєкт із унікальною ідентичністю,
 * тотожність якого визначається id, а не значеннями полів.
 *
 * @typeParam TProps — форма внутрішнього стану сутності
 */
export abstract class Entity<TProps> {
  protected readonly _id: UniqueEntityID;
  protected readonly props: TProps;

  protected constructor(props: TProps, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID();
    this.props = props;
  }

  /** Дві сутності рівні, якщо це той самий екземпляр або збігаються їхні id. */
  public equals(object?: Entity<TProps>): boolean {
    if (object === null || object === undefined) return false;
    if (this === object) return true;
    if (!(object instanceof Entity)) return false;
    return this._id.equals(object._id);
  }
}
