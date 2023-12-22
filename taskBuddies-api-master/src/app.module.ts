import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TagModule } from './tag/tag.module';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { TaskRecurrenceModule } from './task_recurrence/task_recurrence.module';
import { GroupModule } from './group/group.module';
import { TaskUserCommentModule } from './task_user_comment/task_user_comment.module';
import { TaskUserModule } from './task_user/task_user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    TagModule,
    UserModule,
    AuthModule,
    TaskModule,
    TaskRecurrenceModule,
    GroupModule,
    TaskUserCommentModule,
    TaskUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
