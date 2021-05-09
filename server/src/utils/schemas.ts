import * as yup from 'yup';

type ProductFields = {
  name: unknown;
  unique_name: unknown;
  value: unknown;
  description: unknown;
  active: unknown;
};

export class CategorySchema {
  static nameSchema = yup.string().required().max(20);

  static async validateNameSchema(name?: string): Promise<void> {
    await CategorySchema.nameSchema.validate(name, { abortEarly: false });
  }
}

export class ProductSchema {
  static nameSchema = yup.string().required().max(255);
  static valueSchema = yup.number().required();
  static descriptionSchema = yup.string().required().max(5000);
  static activeSchema = yup.boolean().required();
  static productSchema = yup.object().shape({
    name: ProductSchema.nameSchema,
    unique_name: ProductSchema.nameSchema,
    value: ProductSchema.valueSchema,
    description: ProductSchema.descriptionSchema,
    active: ProductSchema.activeSchema,
  });

  static async validateProductSchema({
    name,
    unique_name,
    value,
    description,
    active,
  }: ProductFields): Promise<void> {
    await ProductSchema.productSchema.validate(
      {
        name,
        unique_name,
        value,
        description,
        active,
      },
      { abortEarly: false },
    );
  }
}
