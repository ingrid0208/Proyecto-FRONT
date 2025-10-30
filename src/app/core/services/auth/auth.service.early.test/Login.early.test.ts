import { of, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import { LoginEmailRequest } from '../../../../shared/modeloModelados/auth/request/LoginEmailRequest';
import { LoginEmailResponse } from '../../../../shared/modeloModelados/auth/response/LoginEmailResponse';
import { User } from '../../../../shared/modeloModelados/modelSecurity/user.model';

// ===========================
// MOCKS
// ===========================

// Mock for ApiService
class MockApiService {
  public optsCookie = jest.fn().mockReturnValue({} as any);
  public withCredentials: boolean = true;
  public url = jest.fn().mockImplementation((controller: string, ...segments: (string | number)[]) => {
    return `/api/${controller}/${segments.join('/')}`;
  });
  public http = {
    post: jest.fn(),
    get: jest.fn(),
  };
}

// Mock for UserStore
class MockUserStore {
  public set = jest.fn();
}

// Mock for Router
class MockRouter {
  public navigate = jest.fn();
}

// ===========================
// MOCK DATA
// ===========================
const mockUser: User = {
  id: 1,
  fullName: 'ingrid',
  email: 'yulissamain.04@gmail.com',
  roles: ['Finanza'],
  menu: [],
  personId: 123,
} as any;

const mockLoginRequest: LoginEmailRequest = {
  email: 'yulissamain.04@gmail.com',
  password: 'Admin.123',
} as any;

const mockLoginResponseSuccess: LoginEmailResponse = {
  isSuccess: true,
  message: 'Login successful',
  token: 'token123',
  user: {
    id: 1,
    email: 'yulissamain.04@gmail.com',
    name: 'ingrid',
  },
} as any;

const mockLoginResponseFailure: LoginEmailResponse = {
  isSuccess: false,
  message: 'Invalid credentials',
} as any;

const mockLoginResponseStatusError: LoginEmailResponse = {
  isSuccess: true,
  status: 'error',
  message: 'Some error',
} as any;

const mockHttpError401 = { status: 401, error: { message: 'Unauthorized' } } as any;
const mockHttpError400 = { status: 400, error: { message: 'Bad Request' } } as any;
const mockHttpErrorWithDetail = { status: 500, error: { detail: 'Server error detail', message: 'Server error' } } as any;
const mockHttpErrorGeneric = { status: 500, error: { message: 'Generic error' } } as any;

// ===========================
// TESTS
// ===========================
describe('AuthService.Login()', () => {
  let service: AuthService;
  let mockApiService: MockApiService;
  let mockUserStore: MockUserStore;
  let mockRouter: MockRouter;

  beforeEach(() => {
    jest.clearAllMocks();

    // Initialize mocks
    mockApiService = new MockApiService();
    mockUserStore = new MockUserStore();
    mockRouter = new MockRouter();

    // ✅ Pass mockApiService to AuthService constructor
    service = new AuthService(mockApiService as any);

    // ✅ Override internal dependencies
    (service as any).http = mockApiService.http;
    (service as any).userStore = mockUserStore;
    (service as any).router = mockRouter;
    (service as any).url = mockApiService.url;
    (service as any).optsCookie = mockApiService.optsCookie;
  });

  // ===========================
  // Happy Paths
  // ===========================
  describe('Happy paths', () => {
    it('should login successfully and return user from GetMe', async () => {
      jest.spyOn(mockApiService.http, 'post').mockReturnValue(of(mockLoginResponseSuccess) as any);
      jest.spyOn(mockApiService.http, 'get').mockReturnValue(of(mockUser) as any);

      const result = await service.Login(mockLoginRequest as any).toPromise();

      expect(mockApiService.http.post).toHaveBeenCalledWith('/api/Auth/login', mockLoginRequest, { withCredentials: true });
      expect(mockApiService.http.get).toHaveBeenCalledWith('/api/Auth/me', {});
      expect(mockUserStore.set).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });

    it('should call GetMe even if isSuccess is missing but no error status', async () => {
      const responseWithoutIsSuccess = { message: 'No isSuccess' } as any;
      jest.spyOn(mockApiService.http, 'post').mockReturnValue(of(responseWithoutIsSuccess) as any);
      jest.spyOn(mockApiService.http, 'get').mockReturnValue(of(mockUser) as any);

      const result = await service.Login(mockLoginRequest as any).toPromise();

      expect(mockApiService.http.get).toHaveBeenCalled();
      expect(result).toEqual(mockUser);
    });
  });

  // ===========================
  // Edge Cases
  // ===========================
  describe('Edge cases', () => {
    it('should throw error if login response isSuccess is false', async () => {
      jest.spyOn(mockApiService.http, 'post').mockReturnValue(of(mockLoginResponseFailure) as any);

      let errorCaught: any = null;
      await service.Login(mockLoginRequest as any).toPromise().catch(e => (errorCaught = e));

      expect(errorCaught).toBeDefined();
      expect(errorCaught.error.message).toBe('Invalid credentials');
      expect(mockApiService.http.get).not.toHaveBeenCalled();
    });

    it('should throw error if login response status is "error"', async () => {
      jest.spyOn(mockApiService.http, 'post').mockReturnValue(of(mockLoginResponseStatusError) as any);

      let errorCaught: any = null;
      await service.Login(mockLoginRequest as any).toPromise().catch(e => (errorCaught = e));

      expect(errorCaught).toBeDefined();
      expect(errorCaught.error.message).toBe('Some error');
      expect(mockApiService.http.get).not.toHaveBeenCalled();
    });

    it('should propagate HTTP 401 error from login', async () => {
      jest.spyOn(mockApiService.http, 'post').mockReturnValue(throwError(() => mockHttpError401) as any);

      let errorCaught: any = null;
      await service.Login(mockLoginRequest as any).toPromise().catch(e => (errorCaught = e));

      expect(errorCaught).toBe(mockHttpError401);
      expect(mockApiService.http.get).not.toHaveBeenCalled();
    });

    it('should propagate HTTP 400 error from login', async () => {
      jest.spyOn(mockApiService.http, 'post').mockReturnValue(throwError(() => mockHttpError400) as any);

      let errorCaught: any = null;
      await service.Login(mockLoginRequest as any).toPromise().catch(e => (errorCaught = e));

      expect(errorCaught).toBe(mockHttpError400);
      expect(mockApiService.http.get).not.toHaveBeenCalled();
    });

    it('should replace error message with detail if present in error', async () => {
      jest.spyOn(mockApiService.http, 'post').mockReturnValue(throwError(() => mockHttpErrorWithDetail) as any);

      let errorCaught: any = null;
      await service.Login(mockLoginRequest as any).toPromise().catch(e => (errorCaught = e));

      expect(errorCaught.error.message).toBe('Server error detail');
      expect(mockApiService.http.get).not.toHaveBeenCalled();
    });

    it('should propagate generic error if no detail is present', async () => {
      jest.spyOn(mockApiService.http, 'post').mockReturnValue(throwError(() => mockHttpErrorGeneric) as any);

      let errorCaught: any = null;
      await service.Login(mockLoginRequest as any).toPromise().catch(e => (errorCaught = e));

      expect(errorCaught.error.message).toBe('Generic error');
      expect(mockApiService.http.get).not.toHaveBeenCalled();
    });

    it('should propagate error from GetMe if it fails', async () => {
      jest.spyOn(mockApiService.http, 'post').mockReturnValue(of(mockLoginResponseSuccess) as any);
      jest.spyOn(mockApiService.http, 'get').mockReturnValue(throwError(() => mockHttpErrorGeneric) as any);

      let errorCaught: any = null;
      await service.Login(mockLoginRequest as any).toPromise().catch(e => (errorCaught = e));

      expect(errorCaught.error.message).toBe('Generic error');
      expect(mockUserStore.set).not.toHaveBeenCalled();
    });
  });
});
