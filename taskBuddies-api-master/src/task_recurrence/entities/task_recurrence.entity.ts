// La table "task_recurrence" contient les informations sur la récurrence d'une tâche
// Table task_recurrence {
//     id integer [primary key] // L'identifiant unique de la récurrence
//     task TaskEntity // Les tâches associées à cette récurrence
//     start_date date // La date de début de la récurrence
//     end_date date // La date de fin de la récurrence
//     day_of_week integer // Le jour de la semaine de la récurrence (0 pour Dimanche, 6 pour Samedi)
//     day_of_month integer // Le jour du mois pour la récurrence mensuelle
//     recurrence_interval integer // L'intervalle de récurrence (par exemple, "2" pour une récurrence tous les 2 jours)
//   }

import { TaskEntity } from '../../task/entities/task.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task_recurrence')
export class TaskRecurrenceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TaskEntity, (task) => task.recurrences)
  task: TaskEntity;

  @Column()
  start_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({ nullable: true })
  day_of_week: number; // 0 for Sunday, 6 for Saturday

  @Column({ nullable: true })
  day_of_month: number; // 1-31

  @Column({ nullable: true })
  recurrence_interval: number; // 1-365
}
