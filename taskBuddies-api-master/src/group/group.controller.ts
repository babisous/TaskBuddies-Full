import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { User } from 'src/config/decorators/user.decorator';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @User() user: UserEntity) {
    return this.groupService.create(createGroupDto, user);
  }

  @Get()
  findAll() {
    return this.groupService.findAll();
  }

  @Get('user')
  async findByUser(@User() user: UserEntity) {
    const groups = await this.groupService.findByUser(user);
    return groups;
  }

  @Get('creator')
  async findByCreatedBy(@User() user: UserEntity) {
    const groups = await this.groupService.findByCreatorUser(user);
    return groups;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserEntity) {
    return this.groupService.remove(+id, user);
  }

  @Post('join/:entryCode')
  joinGroup(@Param('entryCode') entryCode: string, @User() user: UserEntity) {
    return this.groupService.joinGroup(entryCode, user);
  }

  @Post('leave/:id')
  leaveGroup(@Param('id') id: string, @User() user: UserEntity) {
    return this.groupService.leaveGroup(+id, user);
  }

  @Delete(':groupId/user/:userId')
  async removeUserFromGroup(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
    @User() user: UserEntity,
  ) {
    return this.groupService.removeUserFromGroup(+groupId, +userId, user);
  }
}
