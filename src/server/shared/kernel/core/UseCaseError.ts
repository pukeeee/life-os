/**
 * Базовий клас для очікуваних (бізнесових) помилок прикладного шару.
 * Такі помилки — частина контракту use case-а й повертаються через Result.fail,
 * на відміну від несподіваних технічних збоїв (див. UnexpectedError).
 */
export abstract class UseCaseError {
  public readonly message: string;

  protected constructor(message: string) {
    this.message = message;
  }
}
