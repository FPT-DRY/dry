import { autoImplement } from '@lib/helper';

interface ICategory {
  id: string;
  name: string;
}

export class CategoryResponse extends autoImplement<ICategory>() {
  constructor(category: any) {
    super();
    this.id = category.id;
    this.name = category.name;
  }
}
