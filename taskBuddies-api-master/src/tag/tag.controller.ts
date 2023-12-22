import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { User } from '../config/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { TagEntity } from './entities/tag.entity';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto, @User() user: UserEntity) {
    return this.tagService.create(createTagDto, user);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(+id);
  }

  @Get('user/:id')
  findByUserId(@Param('id') id: string) {
    return this.tagService.findByUserId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }

  @Post('group/:groupId')
  createTagWithGroup(
    @Body() tag: Partial<TagEntity>,
    @User() user: UserEntity,
    @Param('groupId') groupId: number,
  ) {
    return this.tagService.createTagWithGroup(tag, user, groupId);
  }

  @Get('group/:groupId')
  findByGroupId(@Param('groupId') groupId: number) {
    return this.tagService.findByGroupId(groupId);
  }
}
