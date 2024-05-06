import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { JwtStrategy } from "../../strategy/jwt.strategy";
import { LocalStrategy } from "../../strategy/local.strategy";
import { UserModel } from "./models/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
    }),
  ],
  controllers: [AuthController, UserController],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
})
export class AuthModule {}
