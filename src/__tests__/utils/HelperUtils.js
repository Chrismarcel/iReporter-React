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

describe('Test JWT verification', () => {
  it('should validate valid token', () => {
    HelperUtils.verifyToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJqYW5lZUBnbWFpbC5jb20iLCJpc2FkbWluIjoiZmFsc2UiLCJmaXJzdG5hbWUiOiJKYW5lIiwibGFzdG5hbWUiOiJPa2UiLCJwaG9uZW51bWJlciI6IjA4MDc2NTY0NzU0IiwidXNlcm5hbWUiOiJKYW5lZSIsImNyZWF0ZWRvbiI6IjIwMTktMDEtMjhUMDE6NDY6MzUuMTcyWiIsImlhdCI6MTU1NjcxODQxNCwiZXhwIjoxNTU3MzIzMjE0fQ.8XkzzF2DV1PjehXXMSsPn8xz9wYSeNourkZmAPhLJRM'
    );
  });

  it('should invalidate invalid token', () => {
    HelperUtils.verifyToken('bad token');
  });
});
