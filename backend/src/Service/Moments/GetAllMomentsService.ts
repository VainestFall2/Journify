import prismaClient from '../../prisma';

interface RegisteredMomentProps {
  user: { userId: string };
}

class GetAllMomentsService {
  async execute({ user }: RegisteredMomentProps) {
    const registeredMoments = await prismaClient.registeredMoment.findMany({
      where: {
        userId: user.userId,
      },
      orderBy: { isFavorite: 'desc' },
    });

    return registeredMoments;
  }
}

export { GetAllMomentsService };
