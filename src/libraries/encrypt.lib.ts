// Import the necessary lodash functions
import CryptoJS from 'crypto-js';

class EncryptLibraryClass {
  private saltLength;
  private iterations;

  constructor() {
    this.saltLength = 16; // Length of the salt used in PBKDF2
    this.iterations = 10; // Number of iterations in PBKDF2
  }
  
  encryptPassword = (password: string): string => {
    // Generate a random salt
    const salt = CryptoJS.lib.WordArray.random(this.saltLength);
  
    // Hash the password with the salt and iterations
    const hash = CryptoJS.PBKDF2(password, salt, {
      keySize: 512 / 32,
      iterations: this.iterations,
    }).toString(CryptoJS.enc.Base64);
  
    return `${salt.toString(CryptoJS.enc.Base64)}:${hash}`;
  };

  comparePasswords = (savedHash: string, password: string): boolean => {
    // Extract the salt and hash from the saved hash
    const [savedSalt, savedHashWithoutSalt] = savedHash.split(':');
    const salt = CryptoJS.enc.Base64.parse(savedSalt);
  
    // Hash the entered password with the same salt and iterations
    const hash = CryptoJS.PBKDF2(password, salt, {
      keySize: 512 / 32,
      iterations: this.iterations,
    }).toString(CryptoJS.enc.Base64);
  
    // Compare the hashes
    return hash === savedHashWithoutSalt;
  };
}

export const EncryptLibrary = new EncryptLibraryClass();
