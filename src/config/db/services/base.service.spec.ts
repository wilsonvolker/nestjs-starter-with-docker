import { Test, TestingModule } from '@nestjs/testing';
import { BaseService, ICondition, IInsertMapping, IUpdateMapping } from "./base.service";
import { AppModule } from "../../../app.module";
import { StoryService } from "../../../story/services/story.service";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { Story } from "../entities/story.entity";
import { TRANSACTION_RESULT } from "../../../utilities/enums/transaction.enums";

describe('Binbow.BaseService', () => {
  let service: BaseService;
  const timeout = 9999999;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [BaseService],
    }).compile();

    service = module.get<BaseService>(BaseService);
  }, timeout) // allow more time for the typeorm to sync the tables

  beforeEach(async () => {

  });

  it('Test InsertRecords', async () => {
    const result = await service.InsertRecords([
        <IInsertMapping>{
        entity: Story,
        values: <QueryDeepPartialEntity<Story>>{
          board: "jestTest",
          created_by: "jestUser"
        }
      }
    ])
    expect(result).toBe(TRANSACTION_RESULT.SUCCESS);
  }, timeout);

  it('Test UpdateRecords', async () => {
    const result = await service.UpdateRecords([
      <IUpdateMapping>{
        entity: Story,
        values: <QueryDeepPartialEntity<Story>>{
          board: "jestTest",
          created_by: "jestUser2"
        },
        conditions: <ICondition>{
          conditionStr: "board = :board",
          params: {
            board: "jestTest"
          },
        }
      }
    ])
    expect(result).toBe(TRANSACTION_RESULT.SUCCESS);
  }, timeout);
});
