import { DATABASE_CONNECTION } from "../../utilities/constants/repositories.constants";
import { createConnection } from "typeorm";
import { dev } from "../../utilities/constants/common.constants"

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    // @ts-ignore
    useFactory: async () => await createConnection({
      type: "mysql",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      extra: {
        "charset": "utf8mb4_unicode_ci" // set charset to utf8 to support chinese
      },
      synchronize: dev,
      logging: dev,
    })
  }
]
