import { of, throwError } from 'rxjs';
import { EmailVerificationService } from '../email-verification.service';

class MockHttpHeaders {}

class MockApiService {
  public http = {
    post: jest.fn()
  };
  public getHeaders = jest.fn();
  public url = jest.fn();
}

describe('EmailVerificationService.validateCode()', () => {
  let service: EmailVerificationService;
  let mockApiService: MockApiService;

  beforeEach(() => {
    mockApiService = new MockApiService();
    service = new EmailVerificationService(mockApiService as any);
  });

  describe('Happy paths', () => {
    it('should call http.post with correct URL, payload, and headers', async () => {
      const email = 'user@example.com';
      const code = '123456';
      const expectedUrl = 'mocked-url';
      const expectedHeaders = new MockHttpHeaders();
      const expectedResponse = { success: true };

      mockApiService.url.mockReturnValue(expectedUrl);
      mockApiService.getHeaders.mockReturnValue(expectedHeaders);
      mockApiService.http.post.mockReturnValue(of(expectedResponse));

      const result = await service.validateCode(email, code).toPromise();

      expect(mockApiService.url).toHaveBeenCalledWith('verificacion', 'validate');
      expect(mockApiService.getHeaders).toHaveBeenCalled();
      expect(mockApiService.http.post).toHaveBeenCalledWith(
        expectedUrl,
        { email, code },
        { headers: expectedHeaders }
      );
      expect(result).toEqual(expectedResponse);
    });
  });

  describe('Edge cases', () => {
    it('should handle empty email or code', () => {
      const email = '';
      const code = '';

      mockApiService.url.mockReturnValue('mocked-url');
      mockApiService.getHeaders.mockReturnValue(new MockHttpHeaders());
      mockApiService.http.post.mockReturnValue(of({}));

      service.validateCode(email, code).subscribe();
        expect(mockApiService.http.post).toHaveBeenCalledWith(
        jasmine.any(String),
        { email, code },
        jasmine.any(Object)
        );

    });
  });
});
