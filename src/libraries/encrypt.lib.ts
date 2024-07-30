import bcrypt from 'bcrypt';

class EncryptLibraryClass {
  private saltRounds: number;

  constructor() {
    this.saltRounds = 10; // Number of salt rounds for bcrypt
  }
  
  encryptPassword = async (password: string): Promise<string> => {
    // Hash the password with bcrypt
    const hash = await bcrypt.hash(password, this.saltRounds);
    return hash;
  };

  comparePasswords = async (savedHash: string, password: string): Promise<boolean> => {
    // Compare the entered password with the saved hash using bcrypt
    const match = await bcrypt.compare(password, savedHash);
    return match;
  };
}

export const EncryptLibrary = new EncryptLibraryClass();
