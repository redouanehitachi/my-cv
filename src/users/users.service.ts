import { Injectable,  } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  /**
   * create
   */
  create(email: string, password: string) {
    const newUser = this.userRepository.create({ email, password });
    return this.userRepository.save(newUser);
  }
  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
  find(email: string) {
    return this.userRepository.find({ where: { email } });
  }
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.userRepository.save(user);
  }
  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('user not found');
    return this.userRepository.remove(user);
  }
}
