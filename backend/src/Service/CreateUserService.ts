import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prismaClient from '../prisma';

interface UserProps {
  fullName: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ fullName, email, password }: UserProps) {
    const isUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (isUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = jwt.sign(
      { userId: user.id },
      // biome-ignore lint/style/noNonNullAssertion: environment variable is guaranteed to be set
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '72h' },
    );

    return {
      error: false,
      user: {
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
      message: 'Successfully registered!',
    };
  }
}

export { CreateUserService };
