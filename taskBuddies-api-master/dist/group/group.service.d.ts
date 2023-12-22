import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { GroupEntity } from './entities/group.entity';
import { Repository } from 'typeorm';
export declare class GroupService {
    private readonly groupRepository;
    constructor(groupRepository: Repository<GroupEntity>);
    create(createGroupDto: CreateGroupDto, user: UserEntity): Promise<GroupEntity>;
    generateUniqueEntryCode(): Promise<string>;
    findAll(): Promise<GroupEntity[]>;
    findOne(id: number): Promise<GroupEntity>;
    update(id: any, updateGroupDto: UpdateGroupDto): Promise<GroupEntity>;
    remove(id: number, user: UserEntity): Promise<string>;
    joinGroup(entryCode: string, user: UserEntity): Promise<GroupEntity>;
    leaveGroup(groupId: number, user: UserEntity): Promise<GroupEntity>;
    findByUser(user: UserEntity): Promise<GroupEntity[]>;
    findByCreatorUser(user: UserEntity): Promise<GroupEntity[]>;
    removeUserFromGroup(groupId: number, userId: number, creator: UserEntity): Promise<GroupEntity>;
}
