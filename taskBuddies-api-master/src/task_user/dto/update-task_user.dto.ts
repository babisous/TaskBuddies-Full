import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskUserDto } from './create-task_user.dto';

export class UpdateTaskUserDto extends PartialType(CreateTaskUserDto) {}
