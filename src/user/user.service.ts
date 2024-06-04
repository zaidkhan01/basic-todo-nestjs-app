import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repo/user.repository';
import { User } from './entities/user.entity';
import { Constants } from 'src/utils/constants';
import { userInfo } from 'os';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  // findOne(id: number) {
  //   throw new Error('Method not implemented.');
  // }
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
  }

  create(createUserDto: CreateUserDto) {
    const user: User = new User();
    user.email = createUserDto.email;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    // console.log(this.userRepository)
    return this.userRepository.save(user);
  }

  findUserById(id: number) {
    return this.userRepository.findOneOrFail({ where: { id: id } });
  }

  findAll() {
    return this.userRepository.find();
  }

  // update(id: number, createUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} todo`;
  // }
  findUserByEmail(email: string) {
    return this.userRepository.findOne({where:{email:email}});
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
