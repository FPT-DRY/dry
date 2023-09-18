export interface ModelValidator<S> {
  validate<T extends S>(obj: any): T;
}
