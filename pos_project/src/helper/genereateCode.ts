import { Injectable } from "@nestjs/common";

@Injectable()
export class GenerateCode {
  createOrderCode() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberCharacter = "1234567890";
    const charactersLength = characters.length;
    const numberCharacterLength = numberCharacter.length;

    let counter = 0;
    while (counter < 2) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    counter = 0;
    while (counter < 4) {
      let separate = counter === 0 ? "-" : "";
      result +=
        separate +
        numberCharacter.charAt(
          Math.floor(Math.random() * numberCharacterLength)
        );
      counter += 1;
    }
    counter = 0;
    while (counter < 3) {
      let separate = counter === 0 ? "-" : "";
      result +=
        separate +
        characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  createProductCode() {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberCharacter = "1234567890";
    const charactersLength = characters.length;
    const numberCharacterLength = numberCharacter.length;

    let counter = 0;
    while (counter < 3) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    counter = 0;
    while (counter < 4) {
      result += numberCharacter.charAt(
        Math.floor(Math.random() * numberCharacterLength)
      );
      counter += 1;
    }
    counter = 0;
    while (counter < 2) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
