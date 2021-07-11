import { Inject, Injectable } from "@nestjs/common";
import { FindConditions, Repository } from "typeorm";
import { Story } from "../../config/db/entities/story.entity";
import { STORY_REPOSITORY } from "../../utilities/constants/repositories.constants";
import { BinbowBaseService } from '../../config/db/services/binbow.base.service';

@Injectable()
export class StoryService extends BinbowBaseService {
  constructor(
    @Inject(STORY_REPOSITORY)
    private storyRepository: Repository<Story>,
  ) {
    super();
  }

  /**
   * Select data from story table
   * @param conditions
   */
  async find(conditions: FindConditions<Story>): Promise<Story[]> {
    return this.storyRepository.find(conditions)
  }
}
