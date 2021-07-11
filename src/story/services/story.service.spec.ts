import { Test, TestingModule } from '@nestjs/testing';
import { StoryService } from './story.service';
import { AppModule } from "../../app.module";
import { StoryModule } from "../story.module";

describe('StoryService', () => {
  let service: StoryService;
  const timeout = 9999999;

  beforeAll(async () => {
    jest.setTimeout(timeout);

    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<StoryService>(StoryService);
  }, timeout) // allow more time for the typeorm to sync the tables

  beforeEach(async () => {

  });

  it('Test find story data', async () => {
    const result = await service.find({});
    expect(Array.isArray(result)).toBe(true);
  });
});
