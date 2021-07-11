import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { dev } from './utilities/constants/common.constants';
import { StoryModule } from './story/story.module';
import { DatabaseModule } from './config/db/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: dev ? [".env.development.local", ".env.development"] : ".env" // we use docker-compose.yml to assign env to .env actually
    }),
    // DatabaseModule, // already imported in sub-module
    StoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
