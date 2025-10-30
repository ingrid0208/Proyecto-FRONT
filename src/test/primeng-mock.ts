// PrimeNG mocks
export const Dropdown = jest.fn().mockImplementation(() => ({
  writeValue: jest.fn(),
  registerOnChange: jest.fn(),
  registerOnTouched: jest.fn()
}));

export const DropdownModule = {};
export const InputTextModule = {};
export const ButtonModule = {};

// Mock components
export const Button = jest.fn().mockImplementation(() => ({
  click: jest.fn()
}));

export const InputText = jest.fn().mockImplementation(() => ({
  writeValue: jest.fn(),
  registerOnChange: jest.fn(),
  registerOnTouched: jest.fn()
}));

// Export common configurations
export const filterMatchMode = {
  STARTS_WITH: 'startsWith',
  CONTAINS: 'contains',
  EQUALS: 'equals'
};