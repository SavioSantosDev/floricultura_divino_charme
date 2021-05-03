import * as yup from 'yup';

export default class Schemas {
  static nameSchema = yup.string().required().max(20);

  static async validateNameSchema(name?: string): Promise<void> {
    await Schemas.nameSchema.validate(name, { abortEarly: false });
  }
}
