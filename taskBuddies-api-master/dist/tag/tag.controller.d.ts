import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { TagEntity } from './entities/tag.entity';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
    create(createTagDto: CreateTagDto, user: UserEntity): Promise<TagEntity>;
    findAll(): Promise<TagEntity[]>;
    findOne(id: string): Promise<TagEntity[]>;
    findByUserId(id: string): Promise<TagEntity[]>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<{
        id: number;
    } & TagEntity>;
    createTagWithGroup(tag: Partial<TagEntity>, user: UserEntity, groupId: number): Promise<TagEntity>;
    findByGroupId(groupId: number): Promise<TagEntity[]>;
}
