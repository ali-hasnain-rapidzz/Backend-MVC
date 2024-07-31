import jwt from "jsonwebtoken";

class TokenService {
  private static JWT_SECRET = process.env.JWT_SECRET as string;
  private static JWT_EXPIRY = "1h";

  public static generateToken(email: string, name: string): string {
    return jwt.sign({ email, name }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRY,
    });
  }

  public static verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}

export default TokenService;
