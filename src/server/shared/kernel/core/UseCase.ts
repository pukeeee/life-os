/**
 * UseCase — контракт прикладного сценарію (application layer).
 *
 * Кожен use case інкапсулює одну дію системи (напр. "залогувати метрику").
 * Він залежить лише від доменних портів (інтерфейсів репозиторіїв/сервісів),
 * а не від конкретної інфраструктури — це й є інверсія залежностей (DIP).
 *
 * @typeParam IRequest  — вхідний DTO
 * @typeParam IResponse — результат (зазвичай Result<...>)
 */
export interface UseCase<IRequest, IResponse> {
  execute(request: IRequest): Promise<IResponse> | IResponse;
}
