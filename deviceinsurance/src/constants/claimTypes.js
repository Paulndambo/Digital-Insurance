export const claimTypes = [
  { value: 'Accidental Damage', label: 'Accidental Damage' },
  { value: 'Theft', label: 'Theft' },
  { value: 'Loss', label: 'Loss' },
  { value: 'Liquid Damage', label: 'Liquid Damage' },
  { value: 'Other', label: 'Other' }
];

export const claimStatusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  approved: 'bg-green-500/20 text-green-400',
  denied: 'bg-red-500/20 text-red-400',
  processing: 'bg-blue-500/20 text-blue-400'
};
