type ProductCategoryFields = {
  name?: string;
  keywords?: string | string[];
  image?: string;
};

export class MockProductCategory implements ProductCategoryFields {
  constructor(
    public name?: string,
    public keywords?: string | string[],
    public image?: string,
  ) {}
}
