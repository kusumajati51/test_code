import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
    import * as bcrypt from "bcrypt";
import { UserService } from "./user/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}
  async create(createAuthDto: CreateUserDto) {
    var password = await this.hashingPAssword(createAuthDto.password);
    return this.userService.create({ ...createAuthDto, password });
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  public async login(payload) {
    const user = await this.userService.findOne(payload.id);
    const token = await this.generateToken(payload);
    return { user: user, token };
  }

  private async hashingPAssword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  private async generateToken(payload) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
