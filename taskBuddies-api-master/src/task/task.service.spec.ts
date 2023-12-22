// Importation des modules nécessaires pour les tests
import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TaskEntity } from './entities/task.entity';
import { TagEntity } from '../tag/entities/tag.entity';
import { GroupEntity } from '../group/entities/group.entity';
import { TaskRecurrenceEntity } from '../task_recurrence/entities/task_recurrence.entity';
import { UserEntity } from '../user/entities/user.entity';

// Début des tests pour le service TaskService
describe('TaskService', () => {
  // Déclaration des variables nécessaires pour les tests
  let service: TaskService;

  // Création d'un mock pour le repository
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    softDelete: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn(),
      getMany: jest.fn(),
    })),
  };

  // Initialisation avant chaque test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(TagEntity),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(GroupEntity),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(TaskRecurrenceEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    // Récupération du service à tester
    service = module.get<TaskService>(TaskService);
  });

  // Test pour vérifier que le service est bien défini
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test pour la méthode findAll
  describe('findAll', () => {
    // Test pour vérifier que la méthode retourne bien un tableau de tâches
    it('should return an array of tasks', async () => {
      const result = [];
      mockRepository.find.mockReturnValue(result);
      expect(await service.findAll(new UserEntity())).toEqual(result);
    });
  });

  // Test pour la méthode update
  describe('update', () => {
    // Test pour vérifier que la méthode met bien à jour une tâche
    it('should update a task', async () => {
      const result = new TaskEntity();
      mockRepository.findOne.mockReturnValue(result);
      mockRepository.save.mockReturnValue(result);
      expect(await service.update(1, {})).toEqual(result);
    });
  });

  // Test pour la méthode remove
  describe('remove', () => {
    // Test pour vérifier que la méthode supprime bien une tâche
    it('should remove a task', async () => {
      mockRepository.softDelete.mockReturnValue({});
      expect(await service.remove(1)).toBeUndefined();
    });
  });

  // Test pour la méthode create
  describe('create', () => {
    // Test pour vérifier que la méthode crée bien une tâche
    it('should successfully create a task', async () => {
      const task = new TaskEntity();
      mockRepository.save.mockReturnValue(task);
      expect(await service.create({}, new UserEntity())).toEqual(task);
    });
  });

  // Test pour la méthode findOne
  describe('findOne', () => {
    // Test pour vérifier que la méthode retourne bien une tâche
    it('should return a task', async () => {
      const result = new TaskEntity();
      mockRepository.findOne.mockReturnValue(result);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: expect.anything(),
      });
    });
  });

  // Test pour la méthode createWithGroup
  describe('createWithGroup', () => {
    // Test pour vérifier que la méthode crée bien une tâche avec un groupe
    it('devrait créer une tâche avec un groupe avec succès', async () => {
      const task = new TaskEntity();
      const user = new UserEntity();
      user.id = 1;
      const group = new GroupEntity();
      group.id = 1;
      group.createdBy = new UserEntity();
      group.createdBy.id = 1;

      mockRepository.createQueryBuilder.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockReturnValue(group),
        getMany: jest.fn(),
      });

      mockRepository.save.mockReturnValue(task);

      expect(await service.createWithGroup(task, user, group.id)).toEqual(task);
    });
  });

  // Test pour la méthode findAllTasksByGroup
  describe('findAllTasksByGroup', () => {
    // Test pour vérifier que la méthode retourne bien un tableau de tâches par groupe
    it('should return an array of tasks by group', async () => {
      const result = [];
      mockRepository.find.mockReturnValue(result);
      expect(await service.findAllTasksByGroup(1)).toEqual(result);
    });
  });

  // Test pour la méthode getTasksOnDateWithGroup
  describe('getTasksOnDateWithGroup', () => {
    // Test pour vérifier que la méthode retourne bien un tableau de tâches par groupe
    it('should return an array of tasks by group', async () => {
      const result = [];
      mockRepository.createQueryBuilder.mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getOne: jest.fn(),
        getMany: jest.fn().mockReturnValue(result),
      });
      expect(await service.getTasksOnDateWithGroup(1)).toEqual(result);
    });
  });
});
