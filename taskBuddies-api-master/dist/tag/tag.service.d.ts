import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagEntity } from './entities/tag.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { GroupEntity } from 'src/group/entities/group.entity';
export declare class TagService {
    private readonly tagRepository;
    private readonly groupRepository;
    constructor(tagRepository: Repository<TagEntity>, groupRepository: Repository<GroupEntity>);
    create(createTagDto: CreateTagDto, user: UserEntity): Promise<TagEntity>;
    findAll(): Promise<TagEntity[]>;
    findOne(id: number): Promise<TagEntity[]>;
    update(id: number, updateTagDto: UpdateTagDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<{
        id: number;
    } & TagEntity>;
    findByUserId(userId: number): Promise<TagEntity[]>;
    createTagWithGroup(tag: Partial<TagEntity>, user: UserEntity, groupId: any): Promise<TagEntity>;
    findByGroupId(groupId: number): Promise<TagEntity[]>;
}
