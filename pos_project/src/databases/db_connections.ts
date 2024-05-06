import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

@Injectable()
export class DatabaseConnections implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    dotenv.config();
    return {
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      autoLoadEntities: true,
      entities: [
        __dirname + "/../**/*.entity{.ts,.js}",
        __dirname + "/../**/*.model{.ts,.js}",
      ],
      migrations: ["dist/migrations/*.{ts,js}"],
      logger: "file",
      migrationsTableName: "typeorm_migrations",
      synchronize: true,
      migrationsRun: true,
      logging: true,
    };
  }
}
