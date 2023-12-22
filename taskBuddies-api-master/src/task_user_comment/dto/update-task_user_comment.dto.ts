import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskUserCommentDto } from './create-task_user_comment.dto';

export class UpdateTaskUserCommentDto extends PartialType(CreateTaskUserCommentDto) {}
