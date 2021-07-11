import { Inject, Injectable } from "@nestjs/common";
import { FindConditions, Repository } from "typeorm";
import { Story } from "../../config/db/entities/story.entity";
import { STORY_REPOSITORY } from "../../utilities/constants/repositories.constants";

@Injectable()
export class StoryService {
  constructor(
    @Inject(STORY_REPOSITORY)
    private storyRepository: Repository<Story>,
  ) {}

  /**
   * Select data from story table
   * @param conditions
   */
  async find(conditions: FindConditions<Story>): Promise<Story[]> {
    return this.storyRepository.find(conditions)
  }
}
