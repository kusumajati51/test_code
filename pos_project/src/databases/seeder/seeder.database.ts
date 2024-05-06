import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { DatabaseConnections } from "../db_connections";
import { SeedDatabaseConnections } from "./seed_db_connections";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: SeedDatabaseConnections
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class SeederDatabaseProviderModule {}