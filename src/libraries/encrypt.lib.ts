import { ERROR_MESSAGES } from "@Constants/constants";
import { ApiError } from "@Utils/ApiError";
import bcrypt from "bcrypt";
import httpStatus from "http-status";

class EncryptLibraryClass {
  private saltRounds: number;

  constructor() {
    this.saltRounds = 10;
  }

  encryptPassword = async (password: string): Promise<string> => {
    // Hash the password with bcrypt
    const hash = await bcrypt.hash(password, this.saltRounds);
    return hash;
  };

  comparePasswords = async (password: string, savedHash: string): Promise<boolean> => {
    if (!password || !savedHash) {
      throw new ApiError(httpStatus.BAD_REQUEST, ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
    const match = await bcrypt.compare(password, savedHash);
    return match;
  };
}

export const EncryptLibrary = new EncryptLibraryClass();
