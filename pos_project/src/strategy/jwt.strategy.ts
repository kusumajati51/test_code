import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import * as dotenv from "dotenv";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../app/auth/user/user.service";
dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreElements: false,
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException(
        "You are not authorized to perform the operation"
      );
    }

    return user;
  }
}
