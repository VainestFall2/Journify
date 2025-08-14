import prismaClient from '../../prisma';

interface RegisteredMomentProps {
  title: string;
  story: string;
  visitedLocation: string[];
  user: { userId: string };
  imageUrl: string;
  visitedDate: string;
}

class AddMomentsService {
  async execute({
    title,
    story,
    visitedLocation,
    user,
    imageUrl,
    visitedDate,
  }: RegisteredMomentProps) {
    const parsedVisitedDate = new Date(visitedDate);

    const placeholderImageUrl = `http://localhost:8000/uploads/image-default.png`;

    const registeredMoment = await prismaClient.registeredMoment.create({
      data: {
        title,
        story,
        visitedLocation,
        userId: user.userId,
        imageUrl: imageUrl || placeholderImageUrl,
        visitedDate: parsedVisitedDate,
      },
    });

    return registeredMoment;
  }
}

export { AddMomentsService };
