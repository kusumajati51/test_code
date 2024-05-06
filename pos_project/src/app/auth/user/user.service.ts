import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserModel } from '../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
  ) {}

  async create(createAuthDto: CreateUserDto) :Promise<UserModel>{
    try {
      const response = await this.userRepository.save(createAuthDto);
      return response;
    } catch (error) {
      return error;
    }
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async findOne(id: number): Promise<UserModel> {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
