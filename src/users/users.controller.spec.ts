import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { Users, UsersRepository} from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService : UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: getRepositoryToken(Users),
          useValue: {
            save: jest.fn(),
            find: jest.fn()
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Find all Users', () => {
    it('should return an array of users', async () => {
      usersService.findAll = jest.fn();
      const data = controller.findAll();
      expect(controller.findAll()).toBe(data);
    });
  });

  describe('Find an User', () => {
    it('should return an array of an user', async () => {
      usersService.findOne = jest.fn();
      const data = controller.findOne('1');
      expect(controller.findOne('1')).toBe(data);
    });
  });

  describe('Delete an User', () => {
    it('should delete an user', async () => {
        usersService.remove = jest.fn();
        const data = controller.remove('1');
        expect(controller.remove('1')).toBe(data);
    });
  });

  describe('Create an User', () => {
    it('should delete an user', async () => {
        usersService.create = jest.fn();
        var userTest = new CreateUserDto();
        const data = controller.create(userTest);
        expect(controller.create(userTest)).toBe(data);
    });
  });

  describe('Update an User', () => {
    it('should delete an user', async () => {
        usersService.update = jest.fn();
        var updateTest = new UpdateUserDto();
        const data = controller.update("1", updateTest);
        expect(controller.update("1", updateTest)).toBe(data);
    });
  });
});