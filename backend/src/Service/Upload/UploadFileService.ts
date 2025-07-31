/** biome-ignore-all lint/suspicious/noExplicitAny: <Ignore> */
class UploadFileService {
  async execute({ file }: any) {
    try {
      const imageUrl = `http://localhost:8000/uploads/${file.filename}`;

      return imageUrl;
      // biome-ignore lint/correctness/noUnusedVariables: false positive
    } catch (error: any) {
      throw new Error('Error while processing files upload');
    }
  }
}

export { UploadFileService };
