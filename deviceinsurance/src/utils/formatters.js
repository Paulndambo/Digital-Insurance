// Input formatting utility functions
import { formatCurrency } from '../constants/currency';

export const formatPhoneNumber = (value) => {
  const phoneNumber = value.replace(/\D/g, '');
  if (phoneNumber.length <= 3) return phoneNumber;
  if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const formatCardNumber = (value) => {
  const cardNumber = value.replace(/\s/g, '');
  const formatted = cardNumber.match(/.{1,4}/g) || [];
  return formatted.join(' ').slice(0, 19);
};

export const formatExpiryDate = (value) => {
  const expiry = value.replace(/\D/g, '');
  if (expiry.length <= 2) return expiry;
  return `${expiry.slice(0, 2)}/${expiry.slice(2, 4)}`;
};

export const formatPrice = (value) => {
  // Remove all non-digit characters except decimal point
  const cleaned = value.replace(/[^\d.]/g, '');
  // Only allow one decimal point
  const parts = cleaned.split('.');
  if (parts.length > 2) {
    return parts[0] + '.' + parts.slice(1).join('');
  }
  return cleaned;
};

export const calculatePremium = (devicePrice) => {
  if (!devicePrice || !devicePrice.trim()) return 0;
  const deviceValue = parseFloat(devicePrice);
  if (isNaN(deviceValue) || deviceValue <= 0) return 0;
  // 1.5% of device value, minimum 1000 KES (approximately $9.99 equivalent)
  const minimumPremium = 1000;
  return Math.max(deviceValue * 0.015, minimumPremium);
};

export const formatPremium = (devicePrice) => {
  const premium = calculatePremium(devicePrice);
  return formatCurrency(premium);
};
