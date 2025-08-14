/** biome-ignore-all lint/style/useNodejsImportProtocol: <Ignore> */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prismaClient from '../../prisma';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface UserProps {
  user: {
    userId: string;
  };
}

type DeleteRegisterProps = UserProps & { id: string };

class DeleteMomentsService {
  async execute({ user, id }: DeleteRegisterProps) {
    const registerMoment = await prismaClient.registeredMoment.findFirst({
      where: {
        id: id,
        userId: user.userId,
      },
    });

    if (!registerMoment) {
      throw new Error('Registered Moment not found!');
    }

    await prismaClient.registeredMoment.delete({
      where: {
        id: id,
        userId: user.userId,
      },
    });

    const imageUrl = registerMoment.imageUrl;
    const fileName = path.basename(imageUrl);

    if(fileName === 'image-default.png'){
      return { message: 'Image default has been protected' }
    }

    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      fileName,
    );

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log('Failed to delete image file:', err);
      }
    });

    return { message: 'Registered Moment deleted successfully' };
  }
}

export { DeleteMomentsService };
