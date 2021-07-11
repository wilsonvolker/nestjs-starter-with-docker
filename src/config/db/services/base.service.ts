import { Injectable } from "@nestjs/common";
import { Connection, EntityTarget, getConnection, InsertQueryBuilder, UpdateQueryBuilder } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { TRANSACTION_RESULT } from "../../../utilities/enums/transaction.enums";

@Injectable()
export class BaseService {
  constructor() {}

  /* functions to interact with db */
  /**
   * Insert records in batch with transaction
   * @param params - params for the query
   */
  async InsertRecords(
    params: IInsertMapping[]
  ){
    let tResult: TRANSACTION_RESULT = TRANSACTION_RESULT.FAILED;
    await getConnection().transaction(async transactionEntityManager => {
      for (const param of params) {
        const query = this.genInsertQueryBuilder(
          transactionEntityManager.connection,
          param,
        )

        await query.execute();
      }
      tResult = TRANSACTION_RESULT.SUCCESS;
    });

    return tResult;
  }

  /**
   * Update records in batch with transaction and conditions
   * @param params - params for the query
   */
  async UpdateRecords(
    params: IUpdateMapping[],
  ){
    let tResult: TRANSACTION_RESULT = TRANSACTION_RESULT.FAILED;

    await getConnection().transaction(async transactionEntityManager => {
      for (const param of params) {
        const query = this.genUpdateQueryBuilder(
          transactionEntityManager.connection,
          param,
        )

        await query.execute();
      }
      tResult = TRANSACTION_RESULT.SUCCESS;
    });

    return tResult;
  }


  /* QueryBuilder generator */
  /**
   * Generate insert QueryBuilderObject
   * @param connection - typeorm connection (db connection)
   * @param params - params for the query
   */
  genInsertQueryBuilder(
    connection: Connection,
    params: IInsertMapping,
  ): InsertQueryBuilder<unknown>{
    return connection
      .createQueryBuilder()
      .insert()
      .into(params.entity)
      .values(params.values);
  }

  /**
   * Generate update QueryBuilderObject
   * @param connection - typeorm connection (db connection)
   * @param params - params for the query
   */
  genUpdateQueryBuilder(
    connection: Connection,
    params: IUpdateMapping,
  ): UpdateQueryBuilder<unknown>{
    return connection
      .createQueryBuilder()
      .update(params.entity)
      .set(params.values)
      .where(params.conditions.conditionStr, params.conditions.params)
  }
}

/**
 * Interface of insert query's parameter
 */
export interface IInsertMapping {
  entity: EntityTarget<unknown>,
  values: QueryDeepPartialEntity<unknown>[],
}

/**
 * Interface of update query's parameter
 */
export interface IUpdateMapping {
  entity: EntityTarget<unknown>,
  values: QueryDeepPartialEntity<unknown>,
  conditions: ICondition,
}

/**
 * Interface of condition in queries
 * @example
 * ```javascript
 * const condition: ICondition = {
 *   conditionStr: "id = :id",
 *   params: {
 *     "id": "<user_id>",
 *   }
 * }
 * ```
 */
export interface ICondition {
  conditionStr: string,
  params: object,
}