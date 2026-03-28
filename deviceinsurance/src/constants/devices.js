import { Smartphone, Laptop, Tablet, Watch, Tv, Camera, Gamepad2, Refrigerator, WashingMachine, Microwave, Bike, Sofa } from 'lucide-react';

export const devices = [
  { id: 'phone', name: 'Smartphone', icon: Smartphone, color: 'from-blue-500 to-cyan-500', group: 'electronics' },
  { id: 'laptop', name: 'Laptop', icon: Laptop, color: 'from-purple-500 to-pink-500', group: 'electronics' },
  { id: 'tablet', name: 'Tablet', icon: Tablet, color: 'from-orange-500 to-red-500', group: 'electronics' },
  { id: 'watch', name: 'Smartwatch', icon: Watch, color: 'from-green-500 to-emerald-500', group: 'electronics' },
  { id: 'tv', name: 'Television', icon: Tv, color: 'from-indigo-500 to-blue-500', group: 'electronics' },
  { id: 'camera', name: 'Camera', icon: Camera, color: 'from-rose-500 to-red-500', group: 'electronics' },
  { id: 'console', name: 'Gaming Console', icon: Gamepad2, color: 'from-violet-500 to-purple-500', group: 'electronics' },
  { id: 'refrigerator', name: 'Refrigerator', icon: Refrigerator, color: 'from-cyan-500 to-teal-500', group: 'appliance' },
  { id: 'washing_machine', name: 'Washing Machine', icon: WashingMachine, color: 'from-blue-400 to-indigo-400', group: 'appliance' },
  { id: 'microwave', name: 'Microwave', icon: Microwave, color: 'from-amber-500 to-orange-500', group: 'appliance' },
  { id: 'bike', name: 'Bicycle', icon: Bike, color: 'from-emerald-500 to-green-500', group: 'other' },
  { id: 'furniture', name: 'Furniture', icon: Sofa, color: 'from-stone-500 to-slate-500', group: 'other' },
];
