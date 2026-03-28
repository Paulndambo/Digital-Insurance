// Device type mapping for backend API
export const mapDeviceTypeToBackend = (deviceId) => {
  const mapping = {
    'phone': 'smartphone',
    'laptop': 'laptop',
    'tablet': 'tablet',
    'watch': 'smartwatch',
    'tv': 'television',
    'camera': 'camera',
    'console': 'gaming_console',
    'refrigerator': 'refrigerator',
    'washing_machine': 'washing_machine',
    'microwave': 'microwave',
    'bike': 'bicycle',
    'furniture': 'furniture'
  };
  return mapping[deviceId] || deviceId;
};

export const mapDeviceTypeFromBackend = (backendType) => {
  const mapping = {
    'smartphone': 'phone',
    'laptop': 'laptop',
    'tablet': 'tablet',
    'smartwatch': 'watch',
    'television': 'tv',
    'camera': 'camera',
    'gaming_console': 'console',
    'refrigerator': 'refrigerator',
    'washing_machine': 'washing_machine',
    'microwave': 'microwave',
    'bicycle': 'bike',
    'furniture': 'furniture'
  };
  return mapping[backendType] || backendType;
};
