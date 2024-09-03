import TryCatch from "@Decorators/try_catch.decorator";
import jwt from "jsonwebtoken";

class TokenServiceClass {
  private JWT_SECRET = process.env.JWT_SECRET as string;
  private JWT_EXPIRY = "1h";

  @TryCatch()
  public generateToken(email: string, name: string): string {
    return jwt.sign({ email, name }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRY,
    });
  }
  @TryCatch()
  public verifyToken(token: string): any {
    return jwt.verify(token, this.JWT_SECRET);
  }
}

export const TokenService = new TokenServiceClass();
