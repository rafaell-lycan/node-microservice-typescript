import { JsonController, Get, Post, Body, Param, Put, Delete } from "routing-controllers";
import { Inject } from "typedi";

import { UserService, UserId } from './../../services/UserService';
import { User } from '../../models/User';

@JsonController("/users")
export class UserController {
  constructor(private readonly service: UserService){}

  @Get()
  getAll() {
    return this.service.getAll();
  }

  @Get("/:id")
  getById(@Param("id") id: UserId) {
    return this.service.getById(id);
  }

  @Post()
  create(@Body() user: User) {
    return this.service.insert(user)
  }

  @Put("/:id")
  update(@Param("id") id: UserId, @Body() user: User) {
    return this.service.update(id, user);
  }

  @Delete("/:id")
  delete(@Param("id") id: UserId) {
    return this.service.delete(id);
  }
}
