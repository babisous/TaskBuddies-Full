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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const tag_entity_1 = require("./entities/tag.entity");
const group_entity_1 = require("../group/entities/group.entity");
let TagService = class TagService {
    constructor(tagRepository, groupRepository) {
        this.tagRepository = tagRepository;
        this.groupRepository = groupRepository;
    }
    async create(createTagDto, user) {
        try {
            const tag = new tag_entity_1.TagEntity();
            tag.title = createTagDto.title;
            tag.icon = createTagDto.icon;
            tag.color = createTagDto.color;
            tag.createdBy = user;
            const savedTag = await this.tagRepository.save(tag);
            return savedTag;
        }
        catch (error) {
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
        }
        catch (error) {
            throw new Error('Error finding tags');
        }
    }
    async findOne(id) {
        try {
            const tag = await this.tagRepository.findBy({ id });
            return tag;
        }
        catch (error) {
            throw new Error('Error finding tag');
        }
    }
    async update(id, updateTagDto) {
        try {
            console.log('updateTagDto', updateTagDto);
            const tag = await this.tagRepository.update(id, updateTagDto);
            console.log('tag', tag);
            return tag;
        }
        catch (error) {
            throw new Error('Error updating tag');
        }
    }
    async remove(id) {
        try {
            const tag = await this.tagRepository.softRemove({ id });
            return tag;
        }
        catch (error) {
            throw new Error('Error deleting tag');
        }
    }
    async findByUserId(userId) {
        try {
            const tags = await this.tagRepository
                .createQueryBuilder('tag')
                .leftJoinAndSelect('tag.createdBy', 'createdBy')
                .where('createdBy.id = :userId', { userId })
                .getMany();
            return tags;
        }
        catch (error) {
            throw new Error('Error finding tags');
        }
    }
    async createTagWithGroup(tag, user, groupId) {
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
    async findByGroupId(groupId) {
        try {
            const tags = await this.tagRepository
                .createQueryBuilder('tag')
                .leftJoinAndSelect('tag.group', 'group')
                .where('group.id = :groupId', { groupId })
                .getMany();
            return tags;
        }
        catch (error) {
            throw new Error('Erreur lors de la recherche des tags');
        }
    }
};
TagService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tag_entity_1.TagEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(group_entity_1.GroupEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TagService);
exports.TagService = TagService;
//# sourceMappingURL=tag.service.js.map