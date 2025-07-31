/** biome-ignore-all lint/correctness/noUnusedFunctionParameters: <Ignore> */
import type { FastifyRequest } from 'fastify';
import multer from 'fastify-multer';
import type { File, FileFilterCallback } from 'fastify-multer/lib/interfaces';
// biome-ignore lint/style/useNodejsImportProtocol: <Ignore>
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },

  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (
  req: FastifyRequest,
  file: File,
  cb: FileFilterCallback,
) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

export const upload = multer({ storage, fileFilter });
