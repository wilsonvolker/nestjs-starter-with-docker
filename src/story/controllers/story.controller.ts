import { Controller, Get } from '@nestjs/common';
import { StoryService } from '../services/story.service';

@Controller('story')
export class StoryController {
  constructor(
    private readonly storyService: StoryService
  ) {
  }
  @Get()
  async getAll():Promise<string>{
    return JSON.stringify(await this.storyService.find({}));
  }
}
