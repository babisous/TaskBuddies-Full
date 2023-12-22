import { CreateTaskUserCommentDto } from './dto/create-task_user_comment.dto';
import { UpdateTaskUserCommentDto } from './dto/update-task_user_comment.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { TaskUserCommentEntity } from './entities/task_user_comment.entity';
import { TaskUserEntity } from 'src/task_user/entities/task_user.entity';
import { Repository } from 'typeorm';
export declare class TaskUserCommentService {
    private taskUserCommentRepository;
    private taskUserRepository;
    constructor(taskUserCommentRepository: Repository<TaskUserCommentEntity>, taskUserRepository: Repository<TaskUserEntity>);
    create(taskUserId: number, createTaskUserCommentDto: CreateTaskUserCommentDto, user: UserEntity): Promise<TaskUserCommentEntity>;
    findAll(): Promise<TaskUserCommentEntity[]>;
    findAllCommentsByTaskUser(taskUserId: number): Promise<TaskUserCommentEntity[]>;
    findOne(id: number): string;
    update(id: number, updateTaskUserCommentDto: UpdateTaskUserCommentDto): string;
    remove(id: number): string;
}
