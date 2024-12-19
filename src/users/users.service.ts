import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

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
  update(id: number,attrs:Partial<User> ) {
  
  }
  remove(id: number) {
   
  }
}
