// Device type mapping for backend API
export const mapDeviceTypeToBackend = (deviceId) => {
  const mapping = {
    'phone': 'smartphone',
    'laptop': 'laptop',
    'tablet': 'tablet',
    'watch': 'smartwatch'
  };
  return mapping[deviceId] || deviceId;
};

export const mapDeviceTypeFromBackend = (backendType) => {
  const mapping = {
    'smartphone': 'phone',
    'laptop': 'laptop',
    'tablet': 'tablet',
    'smartwatch': 'watch'
  };
  return mapping[backendType] || backendType;
};
