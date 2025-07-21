import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prismaClient from '../prisma';

interface UserProps {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: UserProps) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      // biome-ignore lint/style/noNonNullAssertion: environment variable is guaranteed to be set
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '72h' },
    );

    return {
      erro: false,
      message: 'Successful login!',
      user: { fullName: user.fullName, email: user.email },
      accessToken,
    };
  }
}

export { LoginUserService };
