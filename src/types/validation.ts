export interface ModelValidator<S> {
  validate<T extends S>(obj: any): T;
}

export type ValidationSchema = {
  required?: string[];
};