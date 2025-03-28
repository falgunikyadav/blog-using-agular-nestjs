import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    findByEmail(email: string): Promise<User| null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async create(user: Partial<User>): Promise<User> {
        return this.userRepository.save(user);
    }

    async update(id: number, user: Partial<User>): Promise<void> {
        await this.userRepository.update(id, user);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
