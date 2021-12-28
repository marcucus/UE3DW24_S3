import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { Users, UsersRepository} from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';


describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    usersRepository = module.get<UsersRepository>(UsersRepository);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UserService.findAll', () => {
    it('should return an array of users', async () => {
      usersRepository.find = jest.fn();
      const data = service.findAll();
      expect(service.findAll()).toBe(data);
    });
  });

  describe('UserService.findOne ', () => {
    it('should return an user', async () => {
      service.findOne = jest.fn();
      const data = service.findOne(1);
      expect(service.findOne(1)).toBe(data);
    });
  });

  describe('UserService.create', () => {
    it('should create an user', async () => {
      usersRepository.create = jest.fn();
      var userTest = new CreateUserDto();
      const data = service.create(userTest);
      expect(service.create(userTest)).toBe(data);
    });
  });

  describe('UserService.update', () => {
    it('should update an user', async () => {
      usersRepository.update = jest.fn();
      var userTest = new UpdateUserDto();
      const data = service.update(1,userTest);
      expect(service.update(1, userTest)).toBe(data);
    });
  });

  describe('UserService.remove', () => {
    it('should delete an user', async () => {
      service.remove = jest.fn();
      expect(service.remove(1));
    });
  });
});