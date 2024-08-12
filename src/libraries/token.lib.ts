import jwt from "jsonwebtoken";

class TokenServiceClass {
  private JWT_SECRET = process.env.JWT_SECRET as string;
  private JWT_EXPIRY = "1h";

  public generateToken(email: string, name: string): string {
    return jwt.sign({ email, name }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRY,
    });
  }

  public verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}

export const TokenService = new TokenServiceClass();
