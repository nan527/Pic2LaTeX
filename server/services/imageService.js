const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;

class ImageService {
  constructor() {
    this.uploadDir = path.join(__dirname, '../../uploads');
    this.ensureUploadDir();
  }

  async ensureUploadDir() {
    try {
      await fs.access(this.uploadDir);
    } catch {
      await fs.mkdir(this.uploadDir, { recursive: true });
    }
  }

  async processImage(buffer, filename) {
    const processedFilename = `${Date.now()}-${filename}`;
    const outputPath = path.join(this.uploadDir, processedFilename);

    await sharp(buffer)
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 90 })
      .toFile(outputPath);

    return {
      id: processedFilename.replace('.png', ''),
      filename: processedFilename,
      path: outputPath,
      size: (await fs.stat(outputPath)).size
    };
  }

  async getImagePath(imageId) {
    const files = await fs.readdir(this.uploadDir);
    const file = files.find(f => f.startsWith(imageId));
    if (!file) {
      throw new Error('图片不存在');
    }
    return path.join(this.uploadDir, file);
  }

  async deleteImage(imageId) {
    const filePath = await this.getImagePath(imageId);
    await fs.unlink(filePath);
  }

  async getImageBuffer(imageId) {
    const filePath = await this.getImagePath(imageId);
    return await fs.readFile(filePath);
  }
}

module.exports = new ImageService();
