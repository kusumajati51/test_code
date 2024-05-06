import { Injectable } from "@nestjs/common";
import { UserModel } from "src/app/auth/models/user.entity";
import { DataSource } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserServiceSeed {
  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    await this.dataSource.getRepository(UserModel).upsert(
      [
        {
          id: 1,
          name: "tester",
          email: "testert@hotmail.com",
          password: await this.hashingPAssword("123456789"),
          phoneNumber: "480-296-07551 ",
          gender: "male",
        },
      ],
      ["id"]
    );
  }
  private async hashingPAssword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}
