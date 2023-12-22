"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const group_entity_1 = require("./entities/group.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let GroupService = class GroupService {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    async create(createGroupDto, user) {
        try {
            const group = new group_entity_1.GroupEntity();
            group.createdBy = user;
            group.name = createGroupDto.name;
            group.entryCode = await this.generateUniqueEntryCode();
            group.users = [user];
            const savedGroup = await this.groupRepository.save(group);
            console.log('Group saved successfully:', savedGroup);
            return savedGroup;
        }
        catch (error) {
            console.error('Error saving group:', error);
            throw error;
        }
    }
    async generateUniqueEntryCode() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 8;
        const maxAttempts = 10;
        let entryCode = '';
        let codeExists = true;
        let attempts = 0;
        while (codeExists && attempts < maxAttempts) {
            entryCode = '';
            for (let i = 0; i < codeLength; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                entryCode += characters.charAt(randomIndex);
            }
            const existingGroup = await this.groupRepository.findOne({
                where: { entryCode: entryCode },
            });
            codeExists = !!existingGroup;
            attempts++;
        }
        if (codeExists) {
            throw new Error("Impossible de générer un code d'entrée unique.");
        }
        return entryCode;
    }
    findAll() {
        const groups = this.groupRepository.find({ relations: ['createdBy'] });
        return groups;
    }
    findOne(id) {
        const group = this.groupRepository.findOne({
            where: { id },
            relations: ['users', 'createdBy', 'tasks', 'tasks.recurrences', 'tags'],
        });
        return group;
    }
    async update(id, updateGroupDto) {
        try {
            const group = await this.groupRepository.findOne({ where: { id: id } });
            if (!group) {
                throw new Error(`Group with id ${id} not found.`);
            }
            group.name = updateGroupDto.name;
            await this.groupRepository.save(group);
            console.log('Group updated successfully:', group);
            return group;
        }
        catch (error) {
            console.error('Error updating group:', error);
            throw error;
        }
    }
    async remove(id, user) {
        try {
            const group = await this.groupRepository.findOne({
                where: { id },
                relations: ['createdBy'],
            });
            if (!group) {
                throw new Error(`Groupe avec l'id ${id} non trouvé.`);
            }
            if (group.createdBy.id !== user.id) {
                throw new Error("Vous n'êtes pas le créateur du groupe, vous ne pouvez pas le supprimer.");
            }
            await this.groupRepository.softDelete(id);
            return `Groupe avec l'id ${id} supprimé avec succès.`;
        }
        catch (error) {
            console.error('Erreur lors de la suppression du groupe:', error);
            throw error;
        }
    }
    async joinGroup(entryCode, user) {
        try {
            const group = await this.groupRepository.findOne({
                where: { entryCode },
                relations: ['users'],
            });
            if (!group) {
                throw new Error('Group not found with the provided entry code.');
            }
            const isUserAlreadyInGroup = group.users.some((u) => u.id === user.id);
            if (isUserAlreadyInGroup) {
                throw new Error('User is already a member of the group.');
            }
            group.users.push(user);
            const updatedGroup = await this.groupRepository.save(group);
            return updatedGroup;
        }
        catch (error) {
            console.error('Error joining group:', error);
            throw error;
        }
    }
    async leaveGroup(groupId, user) {
        try {
            const group = await this.groupRepository.findOne({
                where: { id: groupId },
                relations: ['users'],
            });
            if (!group) {
                throw new Error("Groupe non trouvé avec l'ID fourni.");
            }
            const userIndex = group.users.findIndex((u) => u.id === user.id);
            if (userIndex === -1) {
                throw new Error("L'utilisateur n'est pas membre du groupe.");
            }
            group.users.splice(userIndex, 1);
            const updatedGroup = await this.groupRepository.save(group);
            return updatedGroup;
        }
        catch (error) {
            console.error('Erreur lors de la sortie du groupe:', error);
            throw error;
        }
    }
    async findByUser(user) {
        try {
            const groups = await this.groupRepository
                .createQueryBuilder('group')
                .innerJoin('group.users', 'user', 'user.id = :userId', {
                userId: user.id,
            })
                .leftJoinAndSelect('group.tags', 'tags')
                .getMany();
            if (!groups) {
                throw new Error("Aucun groupe trouvé pour l'utilisateur fourni.");
            }
            return groups;
        }
        catch (error) {
            console.error('Erreur lors de la recherche des groupes par utilisateur:', error);
            throw error;
        }
    }
    async findByCreatorUser(user) {
        try {
            const groups = await this.groupRepository.find({
                where: { createdBy: { id: user.id } },
                relations: ['users'],
            });
            console.log('Groups found by creator user:', groups);
            if (!groups) {
                throw new Error('No groups found for the provided user.');
            }
            return groups;
        }
        catch (error) {
            console.error('Error finding groups by user:', error);
            throw error;
        }
    }
    async removeUserFromGroup(groupId, userId, creator) {
        try {
            const group = await this.groupRepository.findOne({
                where: { id: groupId },
                relations: ['users', 'createdBy'],
            });
            if (!group) {
                throw new Error(`Groupe avec l'id ${groupId} non trouvé.`);
            }
            if (group.createdBy.id !== creator.id) {
                throw new Error("Vous n'êtes pas le créateur du groupe, vous ne pouvez pas retirer des utilisateurs.");
            }
            const userIndex = group.users.findIndex((u) => u.id === userId);
            if (userIndex === -1) {
                throw new Error("L'utilisateur à retirer n'est pas membre du groupe.");
            }
            group.users.splice(userIndex, 1);
            const updatedGroup = await this.groupRepository.save(group);
            return updatedGroup;
        }
        catch (error) {
            console.error("Erreur lors du retrait de l'utilisateur du groupe:", error);
            throw error;
        }
    }
};
GroupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(group_entity_1.GroupEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map