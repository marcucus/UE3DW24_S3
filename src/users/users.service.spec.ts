import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { Users, UsersRepository} from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


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

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UserService.findAll', () => {
    it('should return an array of users', async () => {
      service.findAll = jest.fn();
      expect(service.findAll());
    });
  });

  describe('UserService.findOne ', () => {
    it('should return an user', async () => {
        var tuser = new Users;
        tuser.id = 1;
        const result = new Promise<Users>((resolve, reject) => {
            setTimeout(() => {
                resolve(tuser);
            }, 300);
        });
        jest.spyOn(usersRepository, 'findOne').mockImplementation(() => result);
        expect(await service.findOne(1)).toBe(result);
    });
});
});