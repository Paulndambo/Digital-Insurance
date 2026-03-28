import React from 'react';

/**
 * CoverKit brand logo.
 *
 * variant="full"  → shield icon + "CoverKit" wordmark (horizontal lockup)
 * variant="icon"  → shield icon only (collapsed sidebar, favicon context, etc.)
 *
 * Uses React.useId() so multiple instances on the same page never share
 * a gradient <defs> ID, avoiding SVG rendering bugs.
 */

const ShieldMark = ({ gradId, size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <defs>
      <linearGradient id={gradId} x1="4" y1="2" x2="28" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4DA3FF" />
        <stop offset="55%" stopColor="#1A89FF" />
        <stop offset="100%" stopColor="#0052A3" />
      </linearGradient>
      <linearGradient id={`${gradId}-hi`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>

    {/* Shield body */}
    <path
      d="M16 1.5L3 7v9.5C3 24.2 8.9 31.1 16 33c7.1-1.9 13-8.8 13-16.5V7L16 1.5z"
      fill={`url(#${gradId})`}
    />

    {/* Top-half specular highlight for depth */}
    <path
      d="M16 4L5.5 8.8v7.7C5.5 23 10.4 28.8 16 30.5V4z"
      fill={`url(#${gradId}-hi)`}
      opacity="0.18"
    />

    {/* Inner ring */}
    <path
      d="M16 5L6 9.5v7C6 22.8 10.3 28.3 16 30c5.7-1.7 10-7.2 10-13.5v-7L16 5z"
      fill="none"
      stroke="rgba(255,255,255,0.20)"
      strokeWidth="0.6"
    />

    {/* Check mark */}
    <polyline
      points="10,18.5 13.8,22.5 22,14"
      fill="none"
      stroke="white"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BrandLogo = ({
  variant = 'full',
  iconSize = 32,
  className = '',
}) => {
  const uid = React.useId().replace(/:/g, '');
  const gradId = `ck-g-${uid}`;

  if (variant === 'icon') {
    return <ShieldMark gradId={gradId} size={iconSize} />;
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={{ lineHeight: 1 }}>
      <ShieldMark gradId={gradId} size={iconSize} />
      <span
        style={{
          fontWeight: 700,
          fontSize: Math.round(iconSize * 0.53),
          letterSpacing: '-0.025em',
          color: 'white',
          lineHeight: 1,
          fontFamily: 'inherit',
        }}
      >
        CoverKit
      </span>
    </div>
  );
};

export default BrandLogo;
