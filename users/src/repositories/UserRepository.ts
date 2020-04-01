import { Repository, EntityRepository } from 'typeorm';
import { User } from '../models/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // async updateOrFail(id: string | number, data: User) {
  //   const { affected } = await this.update(id, data);

  //   if(!affected) return Promise.reject();

  //   return await this.findOne(id);
  // }
}
