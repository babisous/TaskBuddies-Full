import { TaskUserCommentService } from './task_user_comment.service';
import { CreateTaskUserCommentDto } from './dto/create-task_user_comment.dto';
import { UpdateTaskUserCommentDto } from './dto/update-task_user_comment.dto';
import { UserEntity } from 'src/user/entities/user.entity';
export declare class TaskUserCommentController {
    private readonly taskUserCommentService;
    constructor(taskUserCommentService: TaskUserCommentService);
    create(taskUserId: string, createTaskUserCommentDto: CreateTaskUserCommentDto, user: UserEntity): Promise<import("./entities/task_user_comment.entity").TaskUserCommentEntity>;
    findAll(): Promise<import("./entities/task_user_comment.entity").TaskUserCommentEntity[]>;
    findAllByTaskUser(taskUserId: number): Promise<import("./entities/task_user_comment.entity").TaskUserCommentEntity[]>;
    findOne(id: string): string;
    update(id: string, updateTaskUserCommentDto: UpdateTaskUserCommentDto): string;
    remove(id: string): string;
}
