import { post } from 'axios';
import 'regenerator-runtime';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @class HelperUtils
 * @description Specifies reusable helper methods
 * @exports HelperUtils
 */
class HelperUtils {
  /**
   * @description Method for uploading images to cloudinary
   * @param {string} fileData
   * @return {object} estimatedTime
   */
  static async uploadImage(fileData) {
    const cloudinaryEndpoint = process.env.CLOUDINARY_URL;
    try {
      const getImage = await post(`${cloudinaryEndpoint}`, fileData, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      });
      const { data } = getImage;
      const secureUrl = data.secure_url;
      return secureUrl.split('/').slice(-1);
    } catch (error) {
      return 'Image could not be uploaded';
    }
  }
}

export default HelperUtils;
