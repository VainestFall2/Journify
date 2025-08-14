import prismaClient from '../../prisma';

interface RegisteredMomentProps {
  title: string;
  story: string;
  visitedLocation: string[];
  user: { userId: string };
  imageUrl: string;
  visitedDate: string;
}

type UpdateMomentsProps = RegisteredMomentProps & { id: string };

class UpdateMomentsService {
  async execute({
    id,
    title,
    story,
    visitedLocation,
    user,
    imageUrl,
    visitedDate,
  }: UpdateMomentsProps) {
    const parsedVisitedDate = new Date(visitedDate);

    const registeredMoment = await prismaClient.registeredMoment.findFirst({
      where: {
        id: id,
        userId: user.userId,
      },
    });

    if (!registeredMoment) {
      throw new Error('Registered moment not found!');
    }

    const placeholderImageUrl = `http://localhost:8000/uploads/paisagem-ai.jpg`;

    const updatedRegisteredMoment = await prismaClient.registeredMoment.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        story: story,
        visitedLocation: visitedLocation,
        imageUrl: imageUrl || placeholderImageUrl,
        visitedDate: parsedVisitedDate,
      },
    });

    return updatedRegisteredMoment;
  }
}

export { UpdateMomentsService };
