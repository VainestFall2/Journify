/** biome-ignore-all lint/style/useNodejsImportProtocol: <Ignore> */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DeleteFileService {
  async execute({ imageUrl }: { imageUrl: string }) {
    const fileName = path.basename(imageUrl);

    const filepath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'uploads',
      fileName,
    );

    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      return { message: 'Image deleted successfully' };
    } else {
      return { error: true, message: 'Image not found' };
    }
  }
}

export { DeleteFileService };
