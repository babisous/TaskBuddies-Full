import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findById(id: number): Promise<UserEntity>;
    findByUsername(username: string): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity>;
    update(id: number, updateUserDto: UpdateUserDto, currentPassword: string): Promise<UserEntity>;
    delete(id: number): Promise<void>;
}
