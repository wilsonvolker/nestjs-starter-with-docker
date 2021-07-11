import { Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION, STORY_REPOSITORY } from "../utilities/constants/repositories.constants";
import { Connection } from "typeorm";
import { Story } from "../config/db/entities/story.entity";

export const storyProviders = [
  {
    provide: STORY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Story),
    inject: [DATABASE_CONNECTION]
  }
]