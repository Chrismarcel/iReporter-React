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

  /**
   * @method convertUTCTOLocalTime
   * @description Method for converting UTC to local time
   * @param {string} timeString - Time stamp
   * @return {object} estimatedTime
   */
  static convertUTCTOLocalTime(timeString) {
    const dateObj = new Date(timeString);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: 'numeric'
    }).format(dateObj);

    return formattedDate;
  }
}

export default HelperUtils;
