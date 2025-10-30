import { Router } from '@angular/router';
import { DocumentSessionService } from '../../../../../core/services/documents/document-session.service';
import { PaymentService } from '../../../../../core/services/payments/payment.service';
import { ServiceGenericService } from '../../../../../core/services/utils/generic/service-generic.service';
import { AnexarMultasComponent } from '../anexar-multas.component';

class MockSwal {
    public static fire = jest.mocked(jest.fn());
}

// ===============================
// Jest Mocks for Dependencies
// ===============================

const mockRouter = {
    navigate: jest.mocked(jest.fn())
} as unknown as jest.Mocked<Router>;

const mockServiceGenericService = {} as unknown as jest.Mocked<ServiceGenericService>;

const mockDocumentSessionService = {} as unknown as jest.Mocked<DocumentSessionService>;

const mockPaymentService = {
    createInfraction: jest.mocked(jest.fn())
} as unknown as jest.Mocked<PaymentService>;

// ===============================
// Test Suite for saveInfraction
// ===============================

describe('AnexarMultasComponent.saveInfraction() saveInfraction method', () => {
    let component: AnexarMultasComponent;
    let originalSwalFire: any;

    beforeAll(() => {
        // Replace Swal.fire globally with our mock
        originalSwalFire = (global as any).Swal?.fire;
        (global as any).Swal = MockSwal as any;
    });

    afterAll(() => {
        // Restore original Swal.fire
        (global as any).Swal = { fire: originalSwalFire } as any;
    });

    beforeEach(() => {
        jest.clearAllMocks();
        component = new AnexarMultasComponent(mockRouter as any, mockServiceGenericService as any, mockDocumentSessionService as any, mockPaymentService as any);
        // Provide a mock for resetForm
        component.resetForm = jest.mocked(jest.fn());
    });

    // ===============================
    // Happy Path Tests
    // ===============================
    describe('Happy paths', () => {
        it('should register infraction successfully and reset form, download PDF if present', async () => {
            // This test aims to verify that a successful infraction registration triggers success alert, PDF download, and form reset.

            // Arrange
            component.form = {
                firstName: 'John',
                lastName: 'Doe',
                documentTypeId: 1,
                documentNumber: '123456',
                typeInfractionId: 2,
                infractionId: 3,
                smldvCount: 5,
                email: 'john.doe@example.com'
            };
            component.isLoading = false;

            const resp = {
                isSuccess: true,
                message: 'Multa registrada exitosamente',
                pdfUrl: 'http://example.com/multa.pdf',
                data: { id: 42 }
            };

            // Mock createInfraction to return an observable that calls next
            mockPaymentService.createInfraction.mockReturnValue({
                subscribe: ({ next }: any) => {
                    next(resp as any);
                }
            } as any);

            // Spy on document.createElement and related DOM methods
            const mockClick = jest.fn();
            const mockAppendChild = jest.fn();
            const mockRemoveChild = jest.fn();
            const mockLink = {
                href: '',
                download: '',
                click: mockClick
            };
            jest.spyOn(document, 'createElement').mockReturnValue(mockLink as any);
            jest.spyOn(document.body, 'appendChild').mockImplementation(mockAppendChild);
            jest.spyOn(document.body, 'removeChild').mockImplementation(mockRemoveChild);

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('✅', resp.message, 'success');
            expect(document.createElement).toHaveBeenCalledWith('a');
            expect(mockLink.href).toBe(resp.pdfUrl);
            expect(mockLink.download).toBe('Multa_42.pdf');
            expect(mockAppendChild).toHaveBeenCalledWith(mockLink);
            expect(mockClick).toHaveBeenCalled();
            expect(mockRemoveChild).toHaveBeenCalledWith(mockLink);
            expect(component.resetForm).toHaveBeenCalled();
            expect(component.isLoading).toBe(false);
        });

        it('should register infraction successfully and reset form, without PDF download if pdfUrl is missing', async () => {
            // This test aims to verify that a successful infraction registration triggers success alert and form reset, but does not download PDF if pdfUrl is absent.

            // Arrange
            component.form = {
                firstName: 'Jane',
                lastName: 'Smith',
                documentTypeId: 2,
                documentNumber: '654321',
                typeInfractionId: 3,
                infractionId: 4,
                smldvCount: 2,
                email: 'jane.smith@example.com'
            };
            component.isLoading = false;

            const resp = {
                isSuccess: true,
                message: 'Multa registrada exitosamente',
                data: { id: 99 }
            };

            mockPaymentService.createInfraction.mockReturnValue({
                subscribe: ({ next }: any) => {
                    next(resp as any);
                }
            } as any);

            // Spy on document.createElement and related DOM methods
            const createElementSpy = jest.spyOn(document, 'createElement');
            const appendChildSpy = jest.spyOn(document.body, 'appendChild');
            const removeChildSpy = jest.spyOn(document.body, 'removeChild');

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('✅', resp.message, 'success');
            expect(component.resetForm).toHaveBeenCalled();
            expect(component.isLoading).toBe(false);
            expect(createElementSpy).not.toHaveBeenCalled();
            expect(appendChildSpy).not.toHaveBeenCalled();
            expect(removeChildSpy).not.toHaveBeenCalled();
        });

        it('should show warning if backend returns isSuccess=false', async () => {
            // This test aims to verify that a failed backend response triggers a warning alert.

            // Arrange
            component.form = {
                firstName: 'John',
                lastName: 'Doe',
                documentTypeId: 1,
                documentNumber: '123456',
                typeInfractionId: 2,
                infractionId: 3,
                smldvCount: 5,
                email: 'john.doe@example.com'
            };
            component.isLoading = false;

            const resp = {
                isSuccess: false,
                message: 'No se pudo registrar la multa'
            };

            mockPaymentService.createInfraction.mockReturnValue({
                subscribe: ({ next }: any) => {
                    next(resp as any);
                }
            } as any);

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('⚠️', resp.message, 'warning');
            expect(component.resetForm).not.toHaveBeenCalled();
            expect(component.isLoading).toBe(false);
        });
    });

    // ===============================
    // Edge Case Tests
    // ===============================
    describe('Edge cases', () => {
        it('should prevent double click if isLoading is true', () => {
            // This test aims to verify that the method returns early if isLoading is true.

            // Arrange
            component.isLoading = true;

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).not.toHaveBeenCalled();
            expect(mockPaymentService.createInfraction).not.toHaveBeenCalled();
        });

        it('should show warning if documentTypeId is missing', () => {
            // This test aims to verify that missing documentTypeId triggers a warning alert.

            // Arrange
            component.form.documentTypeId = null;

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('⚠️', 'Debe seleccionar un tipo de documento', 'warning');
            expect(mockPaymentService.createInfraction).not.toHaveBeenCalled();
        });

        it('should show warning if documentNumber is empty', () => {
            // This test aims to verify that empty documentNumber triggers a warning alert.

            // Arrange
            component.form.documentTypeId = 1;
            component.form.documentNumber = '   ';

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('⚠️', 'Debe ingresar el número de documento', 'warning');
            expect(mockPaymentService.createInfraction).not.toHaveBeenCalled();
        });

        it('should show warning if firstName is empty', () => {
            // This test aims to verify that empty firstName triggers a warning alert.

            // Arrange
            component.form.documentTypeId = 1;
            component.form.documentNumber = '123456';
            component.form.firstName = '   ';

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('⚠️', 'Debe ingresar el nombre', 'warning');
            expect(mockPaymentService.createInfraction).not.toHaveBeenCalled();
        });

        it('should show warning if lastName is empty', () => {
            // This test aims to verify that empty lastName triggers a warning alert.

            // Arrange
            component.form.documentTypeId = 1;
            component.form.documentNumber = '123456';
            component.form.firstName = 'John';
            component.form.lastName = '   ';

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('⚠️', 'Debe ingresar el apellido', 'warning');
            expect(mockPaymentService.createInfraction).not.toHaveBeenCalled();
        });

        it('should show warning if typeInfractionId is missing', () => {
            // This test aims to verify that missing typeInfractionId triggers a warning alert.

            // Arrange
            component.form.documentTypeId = 1;
            component.form.documentNumber = '123456';
            component.form.firstName = 'John';
            component.form.lastName = 'Doe';
            component.form.typeInfractionId = null;

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('⚠️', 'Debe seleccionar un tipo de multa', 'warning');
            expect(mockPaymentService.createInfraction).not.toHaveBeenCalled();
        });

        it('should show warning if infractionId is missing', () => {
            // This test aims to verify that missing infractionId triggers a warning alert.

            // Arrange
            component.form.documentTypeId = 1;
            component.form.documentNumber = '123456';
            component.form.firstName = 'John';
            component.form.lastName = 'Doe';
            component.form.typeInfractionId = 2;
            component.form.infractionId = null;

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('⚠️', 'Debe seleccionar la infracción cometida', 'warning');
            expect(mockPaymentService.createInfraction).not.toHaveBeenCalled();
        });

        it('should show warning if email is empty', () => {
            // This test aims to verify that empty email triggers a warning alert.

            // Arrange
            component.form.documentTypeId = 1;
            component.form.documentNumber = '123456';
            component.form.firstName = 'John';
            component.form.lastName = 'Doe';
            component.form.typeInfractionId = 2;
            component.form.infractionId = 3;
            component.form.email = '   ';

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('⚠️', 'Debe ingresar el correo electrónico', 'warning');
            expect(mockPaymentService.createInfraction).not.toHaveBeenCalled();
        });

        it('should show warning if email format is invalid', () => {
            // This test aims to verify that invalid email format triggers a warning alert.

            // Arrange
            component.form.documentTypeId = 1;
            component.form.documentNumber = '123456';
            component.form.firstName = 'John';
            component.form.lastName = 'Doe';
            component.form.typeInfractionId = 2;
            component.form.infractionId = 3;
            component.form.email = 'invalid-email';

            // Act
            component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('⚠️', 'El correo electrónico no tiene un formato válido', 'warning');
            expect(mockPaymentService.createInfraction).not.toHaveBeenCalled();
        });

        it('should show validation error from backend if error.error.errors is present', async () => {
            // This test aims to verify that backend validation errors are shown in a warning alert.

            // Arrange
            component.form = {
                firstName: 'John',
                lastName: 'Doe',
                documentTypeId: 1,
                documentNumber: '123456',
                typeInfractionId: 2,
                infractionId: 3,
                smldvCount: 5,
                email: 'john.doe@example.com'
            };
            component.isLoading = false;

            const error = {
                error: {
                    errors: {
                        email: ['El correo electrónico ya está registrado']
                    }
                }
            };

            mockPaymentService.createInfraction.mockReturnValue({
                subscribe: ({ error: errorCb }: any) => {
                    errorCb(error as any);
                }
            } as any);

            // Act
            await component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith({
                icon: 'warning',
                title: 'Validación',
                text: '⚠️ El correo electrónico ya está registrado',
                confirmButtonColor: '#d33'
            });
            expect(component.isLoading).toBe(false);
        });

        it('should show generic error if backend error does not contain errors', async () => {
            // This test aims to verify that a generic backend error triggers an error alert.

            // Arrange
            component.form = {
                firstName: 'John',
                lastName: 'Doe',
                documentTypeId: 1,
                documentNumber: '123456',
                typeInfractionId: 2,
                infractionId: 3,
                smldvCount: 5,
                email: 'john.doe@example.com'
            };
            component.isLoading = false;

            const error = {
                error: {
                    message: 'Error interno del servidor'
                }
            };

            mockPaymentService.createInfraction.mockReturnValue({
                subscribe: ({ error: errorCb }: any) => {
                    errorCb(error as any);
                }
            } as any);

            // Act
            await component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('❌', 'Error interno del servidor', 'error');
            expect(component.isLoading).toBe(false);
        });

        it('should show generic error if backend error does not contain error property', async () => {
            // This test aims to verify that a backend error without error property triggers a generic error alert.

            // Arrange
            component.form = {
                firstName: 'John',
                lastName: 'Doe',
                documentTypeId: 1,
                documentNumber: '123456',
                typeInfractionId: 2,
                infractionId: 3,
                smldvCount: 5,
                email: 'john.doe@example.com'
            };
            component.isLoading = false;

            const error = {};

            mockPaymentService.createInfraction.mockReturnValue({
                subscribe: ({ error: errorCb }: any) => {
                    errorCb(error as any);
                }
            } as any);

            // Act
            await component.saveInfraction();

            // Assert
            expect(MockSwal.fire).toHaveBeenCalledWith('❌', 'Error interno del servidor', 'error');
            expect(component.isLoading).toBe(false);
        });
    });
});
