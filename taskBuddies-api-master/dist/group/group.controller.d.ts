import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserEntity } from 'src/user/entities/user.entity';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto, user: UserEntity): Promise<import("./entities/group.entity").GroupEntity>;
    findAll(): Promise<import("./entities/group.entity").GroupEntity[]>;
    findByUser(user: UserEntity): Promise<import("./entities/group.entity").GroupEntity[]>;
    findByCreatedBy(user: UserEntity): Promise<import("./entities/group.entity").GroupEntity[]>;
    findOne(id: string): Promise<import("./entities/group.entity").GroupEntity>;
    update(id: string, updateGroupDto: UpdateGroupDto): Promise<import("./entities/group.entity").GroupEntity>;
    remove(id: string, user: UserEntity): Promise<string>;
    joinGroup(entryCode: string, user: UserEntity): Promise<import("./entities/group.entity").GroupEntity>;
    leaveGroup(id: string, user: UserEntity): Promise<import("./entities/group.entity").GroupEntity>;
    removeUserFromGroup(groupId: string, userId: string, user: UserEntity): Promise<import("./entities/group.entity").GroupEntity>;
}
