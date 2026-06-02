/**
 * Value Object — незмінний обʼєкт без власної ідентичності; визначається лише
 * сукупністю своїх значень (напр. Email, DayDate, MetricKind). Два VO рівні,
 * якщо рівні всі їхні поля. Інкапсулює валідацію та доменні правила формату.
 *
 * @typeParam TProps — форма значень (має бути серіалізовною для порівняння)
 */
export abstract class ValueObject<TProps extends object> {
  protected readonly props: Readonly<TProps>;

  protected constructor(props: TProps) {
    this.props = Object.freeze({ ...props });
  }

  public equals(vo?: ValueObject<TProps>): boolean {
    if (vo === null || vo === undefined) return false;
    if (vo.props === undefined) return false;
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }
}
