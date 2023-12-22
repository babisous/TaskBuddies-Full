import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { GroupEntity } from './entities/group.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async create(createGroupDto: CreateGroupDto, user: UserEntity) {
    try {
      const group = new GroupEntity();
      group.createdBy = user;
      group.name = createGroupDto.name;
      group.entryCode = await this.generateUniqueEntryCode(); // Génère un code d'entrée unique
      group.users = [user];

      const savedGroup = await this.groupRepository.save(group);
      console.log('Group saved successfully:', savedGroup);
      return savedGroup;
    } catch (error) {
      console.error('Error saving group:', error);
      throw error;
    }
  }

  async generateUniqueEntryCode(): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 8;
    const maxAttempts = 10; // Limite d'essais

    let entryCode = '';
    let codeExists = true;
    let attempts = 0;

    while (codeExists && attempts < maxAttempts) {
      entryCode = '';

      // Génère un code d'entrée
      for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        entryCode += characters.charAt(randomIndex);
      }

      // Vérifie si le code existe déjà
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

  findOne(id: number) {
    const group = this.groupRepository.findOne({
      where: { id },
      relations: ['users', 'createdBy', 'tasks', 'tasks.recurrences', 'tags'],
    });

    return group;
  }

  async update(id, updateGroupDto: UpdateGroupDto) {
    try {
      const group = await this.groupRepository.findOne({ where: { id: id } });
      if (!group) {
        throw new Error(`Group with id ${id} not found.`);
      }
      group.name = updateGroupDto.name;
      await this.groupRepository.save(group);
      console.log('Group updated successfully:', group);
      return group;
    } catch (error) {
      console.error('Error updating group:', error);
      throw error;
    }
  }

  async remove(id: number, user: UserEntity) {
    try {
      const group = await this.groupRepository.findOne({
        where: { id },
        relations: ['createdBy'],
      });
      if (!group) {
        throw new Error(`Groupe avec l'id ${id} non trouvé.`);
      }
      if (group.createdBy.id !== user.id) {
        throw new Error(
          "Vous n'êtes pas le créateur du groupe, vous ne pouvez pas le supprimer.",
        );
      }
      await this.groupRepository.softDelete(id);
      return `Groupe avec l'id ${id} supprimé avec succès.`;
    } catch (error) {
      console.error('Erreur lors de la suppression du groupe:', error);
      throw error;
    }
  }

  async joinGroup(entryCode: string, user: UserEntity) {
    try {
      // Rechercher le groupe avec le code d'entrée
      const group = await this.groupRepository.findOne({
        where: { entryCode },
        relations: ['users'],
      });

      if (!group) {
        throw new Error('Group not found with the provided entry code.');
      }

      // Vérifier si l'utilisateur fait déjà partie du groupe
      const isUserAlreadyInGroup = group.users.some((u) => u.id === user.id);
      if (isUserAlreadyInGroup) {
        throw new Error('User is already a member of the group.');
      }

      // Ajouter l'utilisateur à la liste des utilisateurs du groupe
      group.users.push(user);

      // Enregistrer le groupe mis à jour
      const updatedGroup = await this.groupRepository.save(group);

      return updatedGroup;
    } catch (error) {
      console.error('Error joining group:', error);
      throw error;
    }
  }

  async leaveGroup(groupId: number, user: UserEntity) {
    try {
      // Trouver le groupe avec l'ID donné
      const group = await this.groupRepository.findOne({
        where: { id: groupId },
        relations: ['users'],
      });

      if (!group) {
        throw new Error("Groupe non trouvé avec l'ID fourni.");
      }

      // Vérifier si l'utilisateur fait partie du groupe
      const userIndex = group.users.findIndex((u) => u.id === user.id);
      if (userIndex === -1) {
        throw new Error("L'utilisateur n'est pas membre du groupe.");
      }

      // Supprimer l'utilisateur de la liste des utilisateurs du groupe
      group.users.splice(userIndex, 1);

      // Enregistrer le groupe mis à jour
      const updatedGroup = await this.groupRepository.save(group);

      return updatedGroup;
    } catch (error) {
      console.error('Erreur lors de la sortie du groupe:', error);
      throw error;
    }
  }

  async findByUser(user: UserEntity) {
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
    } catch (error) {
      console.error(
        'Erreur lors de la recherche des groupes par utilisateur:',
        error,
      );
      throw error;
    }
  }

  async findByCreatorUser(user: UserEntity) {
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
    } catch (error) {
      console.error('Error finding groups by user:', error);
      throw error;
    }
  }
  async removeUserFromGroup(
    groupId: number,
    userId: number,
    creator: UserEntity,
  ) {
    try {
      // Trouver le groupe avec l'ID donné
      const group = await this.groupRepository.findOne({
        where: { id: groupId },
        relations: ['users', 'createdBy'],
      });

      if (!group) {
        throw new Error(`Groupe avec l'id ${groupId} non trouvé.`);
      }

      // Vérifier si l'utilisateur est le créateur du groupe
      if (group.createdBy.id !== creator.id) {
        throw new Error(
          "Vous n'êtes pas le créateur du groupe, vous ne pouvez pas retirer des utilisateurs.",
        );
      }

      // Vérifier si l'utilisateur à retirer fait partie du groupe
      const userIndex = group.users.findIndex((u) => u.id === userId);
      if (userIndex === -1) {
        throw new Error("L'utilisateur à retirer n'est pas membre du groupe.");
      }

      // Retirer l'utilisateur de la liste des utilisateurs du groupe
      group.users.splice(userIndex, 1);

      // Enregistrer le groupe mis à jour
      const updatedGroup = await this.groupRepository.save(group);

      return updatedGroup;
    } catch (error) {
      console.error(
        "Erreur lors du retrait de l'utilisateur du groupe:",
        error,
      );
      throw error;
    }
  }
}
