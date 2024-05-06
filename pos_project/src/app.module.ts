import * as Joi from "@hapi/joi";
import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./app/auth/auth.module";
import { InventoryModule } from "./app/inventory/inventory.module";
import { OrderModule } from "./app/order/order.module";
import { DatabaseConnections } from "./databases/db_connections";
import { ProductModule } from "./app/product/product.module";
import { APP_INTERCEPTOR } from "@nestjs/core/constants";
import { ResponseInterceptor } from "./interceptor/response/response.intercepor";

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnections,
    }),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        dest: "../resource/**",
      }),
    }),
    AuthModule,
    ProductModule,
    OrderModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
