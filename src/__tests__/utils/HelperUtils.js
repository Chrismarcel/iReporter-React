import moxios from 'moxios';
import HelperUtils from '../../utils/HelperUtils';

describe('Test for cloudinary image uplaod', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should mock successful cloudinary upload', async () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent(mockImageData);
      request.respondWith({
        status: 200,
        response: { secure_url: 'https://url.to/image.png' }
      });
    });

    const response = await HelperUtils.uploadImage(mockImageData);
    expect(response).toEqual(['image.png']);
  });

  it('should mock failing cloudinary upload', async () => {
    const mockImageData = new File(['image content'], { type: 'image/*' });
    moxios.wait(() => {
      const request = moxios.requests.mostRecent(mockImageData);
      request.respondWith({
        status: 400,
        response: { error: 'Image could not be uploaded' }
      });
    });

    const response = await HelperUtils.uploadImage(mockImageData);
    expect(response).toEqual('Image could not be uploaded');
  });
});
