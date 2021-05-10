import { EntityRepository, Repository } from 'typeorm';

import { SubCategory } from '../models/SubCategory';

@EntityRepository(SubCategory)
export class SubCategoryRepository extends Repository<SubCategory> {}
