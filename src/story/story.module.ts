import { Module } from '@nestjs/common';
import { StoryController } from './controllers/story.controller';
import { storyProviders } from './story.providers';
import { StoryService } from './services/story.service';
import { DatabaseModule } from "../config/db/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [StoryController],
  providers: [...storyProviders, StoryService],
})
export class StoryModule {}
