import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { UserRepository } from './../repositories/UserRepository';
import { UserNotFoundError } from './../api/errors/UserNotFoundError';
import { User } from './../models/User';

export type UserId = string | number;

@Service()
export class UserService {

  constructor(@OrmRepository() private userRepository: UserRepository) {}

    /**
    * Creates an instance of User.
    */
    instantiate(data: Object): User {
      return this.userRepository.create(data);
    }

    /**
    * Inserts a new User into the database.
    */
    async insert(data: User): Promise<User> {
      const newUser = this.userRepository.create(data);
      return await this.userRepository.save(newUser);
    }

    /**
    * Returns array of all users from db
    */
    async getAll(): Promise<User[]> {
      return await this.userRepository.find();
    }

    /**
    * Returns a user by given id
    */
    async getById(id: UserId): Promise<User|undefined> {
      const user = await this.userRepository.findOne(id);

      if(!user) throw new UserNotFoundError();

      return user;
    }

    /**
    * Returns a user by email
    */
    async getByEmail(email: string): Promise<User | undefined> {
      const user = await this.userRepository.findOne({ where: { email } });

      if(!user) throw new UserNotFoundError();

      return user;
    }

    /**
    * Updates a user
    */
    async update(id: UserId, data: User): Promise<User | undefined> {
      const { affected } = await this.userRepository.update(id, data);

      if(!affected) throw new UserNotFoundError();

      return await this.userRepository.findOne(id);
    }

    /**
    * Deletes a user
    */
    async delete(id: UserId): Promise<null> {
      const {affected} = await this.userRepository.delete(id);

      if(!affected) throw new UserNotFoundError();

      return null;
    }
  }
