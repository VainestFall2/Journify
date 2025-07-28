import jwt from 'jsonwebtoken';

// biome-ignore lint/complexity/noStaticOnlyClass: false positive
export class AuthUtils {
  static generateAccessToken(userId: string): string {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error('ACCESS_TOKEN_SECRET not defined!');
    }

    return jwt.sign(
      { userId },
      // biome-ignore lint/style/noNonNullAssertion: environment variable is guaranteed to be set
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '72h' },
    );
  }
}
