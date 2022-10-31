import { customAlphabet } from "nanoid";

export enum RandomCodeEnum {
    LOWER = 1,
    UPPER = 2,
    NUMBER = 3, 
}


export function randomCode(length: number, option?: RandomCodeEnum): string {
    let alphabet =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-';
    switch (option) {
      case RandomCodeEnum.LOWER:
        alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
        break;
      case RandomCodeEnum.UPPER:
        alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        break;
      case RandomCodeEnum.NUMBER:
        alphabet = '0123456789';
        break;
      default:
        break;
    }
    const nanoid = customAlphabet(alphabet, length);
    return nanoid();
  }