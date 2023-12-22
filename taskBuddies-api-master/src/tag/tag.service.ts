import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { GroupEntity } from 'src/group/entities/group.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async create(createTagDto: CreateTagDto, user: UserEntity) {
    try {
      const tag = new TagEntity();
      tag.title = createTagDto.title;
      tag.icon = createTagDto.icon;
      tag.color = createTagDto.color;
      tag.createdBy = user;

      const savedTag = await this.tagRepository.save(tag);
      return savedTag;
    } catch (error) {
      console.error('Error detail:', error);
      throw new Error('Error creating tag');
    }
  }

  async findAll() {
    try {
      const tags = await this.tagRepository.find({
        relations: ['createdBy'],
      });
      return tags;
    } catch (error) {
      throw new Error('Error finding tags');
    }
  }

  async findOne(id: number) {
    try {
      const tag = await this.tagRepository.findBy({ id });
      return tag;
    } catch (error) {
      throw new Error('Error finding tag');
    }
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    try {
      console.log('updateTagDto', updateTagDto);
      const tag = await this.tagRepository.update(id, updateTagDto);
      console.log('tag', tag);
      return tag;
    } catch (error) {
      throw new Error('Error updating tag');
    }
  }

  async remove(id: number) {
    try {
      const tag = await this.tagRepository.softRemove({ id });
      return tag;
    } catch (error) {
      throw new Error('Error deleting tag');
    }
  }

  async findByUserId(userId: number) {
    try {
      const tags = await this.tagRepository
        .createQueryBuilder('tag')
        .leftJoinAndSelect('tag.createdBy', 'createdBy')
        .where('createdBy.id = :userId', { userId })
        .getMany();
      return tags;
    } catch (error) {
      throw new Error('Error finding tags');
    }
  }

  async createTagWithGroup(tag: Partial<TagEntity>, user: UserEntity, groupId) {
    const group = await this.groupRepository
      .createQueryBuilder('group')
      .leftJoinAndSelect('group.createdBy', 'createdBy')
      .where('group.id = :id', { id: groupId })
      .getOne();

    if (!group.createdBy || group.createdBy.id !== user.id) {
      throw new Error('User is not the creator of the group');
    }

    tag.group = group;

    const newTag = this.tagRepository.create(tag);
    return this.tagRepository.save(newTag);
  }

  async findByGroupId(groupId: number) {
    try {
      const tags = await this.tagRepository
        .createQueryBuilder('tag')
        .leftJoinAndSelect('tag.group', 'group')
        .where('group.id = :groupId', { groupId })
        .getMany();
      return tags;
    } catch (error) {
      throw new Error('Erreur lors de la recherche des tags');
    }
  }
}
