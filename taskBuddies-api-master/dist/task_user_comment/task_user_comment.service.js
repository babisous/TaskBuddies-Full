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
exports.TaskUserCommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_user_comment_entity_1 = require("./entities/task_user_comment.entity");
const task_user_entity_1 = require("../task_user/entities/task_user.entity");
const typeorm_2 = require("typeorm");
let TaskUserCommentService = class TaskUserCommentService {
    constructor(taskUserCommentRepository, taskUserRepository) {
        this.taskUserCommentRepository = taskUserCommentRepository;
        this.taskUserRepository = taskUserRepository;
    }
    async create(taskUserId, createTaskUserCommentDto, user) {
        const taskUser = await this.taskUserRepository.findOne({
            where: { id: taskUserId },
        });
        if (!taskUser) {
            throw new Error('TaskUser not found');
        }
        const newComment = new task_user_comment_entity_1.TaskUserCommentEntity();
        newComment.content = createTaskUserCommentDto.content;
        newComment.author = user;
        newComment.task_user = taskUser;
        return this.taskUserCommentRepository.save(newComment);
    }
    findAll() {
        return this.taskUserCommentRepository.find();
    }
    async findAllCommentsByTaskUser(taskUserId) {
        return this.taskUserCommentRepository.find({
            where: { task_user: { id: taskUserId } },
            relations: ['author'],
        });
    }
    findOne(id) {
        return `This action returns a #${id} taskUserComment`;
    }
    update(id, updateTaskUserCommentDto) {
        return `This action updates a #${id} taskUserComment`;
    }
    remove(id) {
        return `This action removes a #${id} taskUserComment`;
    }
};
TaskUserCommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_user_comment_entity_1.TaskUserCommentEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(task_user_entity_1.TaskUserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TaskUserCommentService);
exports.TaskUserCommentService = TaskUserCommentService;
//# sourceMappingURL=task_user_comment.service.js.map