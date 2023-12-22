"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const { username, email } = createUserDto;
        const existingUser = await this.userRepository.findOne({
            where: [{ username }, { email }],
        });
        if (existingUser) {
            throw new common_1.HttpException('Username or email already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser = this.userRepository.create(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
        return this.userRepository.save(newUser);
    }
    async findAll() {
        return this.userRepository.find({
            relations: ['tasks', 'taskUsers', 'createdTags', 'groups'],
        });
    }
    async findById(id) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async findByUsername(username) {
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        return user;
    }
    async findByEmail(email) {
        try {
            const user = await this.userRepository.findOne({ where: { email } });
            return user;
        }
        catch (error) {
            throw new common_1.NotFoundException(error);
        }
    }
    async update(id, updateUserDto, currentPassword) {
        const user = await this.findById(id);
        const { username, email, password } = updateUserDto;
        const isPasswordMatching = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatching) {
            throw new common_1.HttpException('Current password is incorrect', common_1.HttpStatus.BAD_REQUEST);
        }
        if (username) {
            const existingUser = await this.userRepository.findOne({
                where: { username },
                select: ['id'],
            });
            if (existingUser && existingUser.id !== user.id) {
                throw new common_1.HttpException('Username already exists', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        if (email) {
            const existingUser = await this.userRepository.findOne({
                where: { email },
                select: ['id'],
            });
            if (existingUser && existingUser.id !== user.id) {
                throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        const updatedUser = await this.userRepository.save(user);
        return updatedUser;
    }
    async delete(id) {
        const user = await this.findById(id);
        await this.userRepository.softRemove(user);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map