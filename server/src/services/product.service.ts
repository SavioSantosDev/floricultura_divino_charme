import { AppError } from '../errors/app.error';
import ProductModel from '../models/product.model';
import Repositories from '../utils/custom-repositories';
import simplifyString from '../utils/simplify-string';
import { ProductSchema } from '../utils/schemas';

class ClientErrors {
  static productAlreadyExists(): never {
    throw new AppError('Product already exist!', 400);
  }

  static noProductHasBeenFound(): never {
    throw new AppError('No product has been found', 400);
  }
}

interface IProductReqData {
  name?: string;
  value?: string;
  description?: string;
  active?: string;
  uniqueName?: string; // Get by req.params
}

export class ProductService {
  private name?: string;
  private storeUniqueName?: string;
  private value?: number;
  private description?: string;
  private active?: boolean;
  private reqUniqueName?: string;

  private product?: ProductModel; // All methods
  private removedProduct?: ProductModel; // Delete
  private updateProduct?: ProductModel; // Update
  private products?: ProductModel[]; // Index

  constructor({
    name,
    value,
    description,
    active,
    uniqueName,
  }: IProductReqData) {
    if (name) {
      this.name = name;
      this.storeUniqueName = simplifyString(name);
    }
    if (value) {
      this.value = Number(value);
    }
    if (description && typeof description === 'string') {
      this.description = description;
    }
    if (active === 'false' || active === 'true') {
      this.active = active === 'true';
    }
    if (typeof uniqueName === 'string') {
      this.reqUniqueName = uniqueName;
    }
  }

  private async findAllProducts() {
    this.products = await Repositories.product().find();
  }

  /**
   * Unique name obtained by params
   */
  private async findOneByReqUniqueName() {
    this.product = await Repositories.product().findOne({
      where: { unique_name: this.reqUniqueName },
    });
  }

  private errorIfNoProductHasBeenFound() {
    if (!this.product) {
      ClientErrors.noProductHasBeenFound();
    }
  }

  private async errorIfProductAlreadyExists() {
    const product = await Repositories.product().findOne({
      where: { unique_name: this.storeUniqueName },
    });
    if (product) {
      ClientErrors.productAlreadyExists();
    }
  }

  private async validateProductData() {
    await ProductSchema.validateProductSchema({
      name: this.name,
      unique_name: this.storeUniqueName,
      value: this.value,
      description: this.description,
      active: this.active,
    });
  }

  private createProductInstance() {
    this.product = Repositories.product().create({
      name: this.name,
      unique_name: this.storeUniqueName,
      value: this.value,
      description: this.description,
      active: this.active,
    });
  }

  private prepareUpdateProduct() {
    this.updateProduct = Repositories.product().create({
      id: this.product?.id,
      name: this.name,
      unique_name: this.storeUniqueName,
      value: this.value,
      description: this.description,
      active: this.active,
    });
  }

  /**
   * Empties the product image and then merge prduct and update product
   */
  private mergeProducts() {
    if (this.product && this.updateProduct) {
      Repositories.product().merge(this.product, this.updateProduct);
    }
  }

  private async saveProductOnDatabase() {
    if (this.product) {
      await Repositories.product().save(this.product);
    }
  }

  private async removeProduct() {
    if (this.product) {
      this.removedProduct = await Repositories.product().remove(this.product);
    }
  }

  // Public methods

  /**
   * Get all producst
   */
  async index(): Promise<ProductModel[]> {
    await this.findAllProducts();
    return this.products as ProductModel[];
  }

  /**
   * Get a single product
   */
  async show(): Promise<ProductModel | undefined> {
    await this.findOneByReqUniqueName();
    this.errorIfNoProductHasBeenFound();
    return this.product;
  }

  /**
   * Store a product and get created product
   */
  async store(): Promise<ProductModel | undefined> {
    await this.validateProductData();

    await this.errorIfProductAlreadyExists();

    this.createProductInstance();
    await this.saveProductOnDatabase();
    return this.product;
  }

  async update(): Promise<ProductModel | undefined> {
    // Checking if exist
    await this.findOneByReqUniqueName();
    this.errorIfNoProductHasBeenFound();

    await this.validateProductData();

    await this.errorIfProductAlreadyExists();

    // console.log(this.product);
    this.prepareUpdateProduct();
    this.mergeProducts();
    // console.log(this.updateProduct);
    // console.log(this.product);

    await this.saveProductOnDatabase();
    return this.product;
  }

  async delete(): Promise<ProductModel | undefined> {
    await this.findOneByReqUniqueName();
    this.errorIfNoProductHasBeenFound();

    await this.removeProduct();
    return this.removedProduct;
  }
}
