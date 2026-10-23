import React from 'react';

/**
 * Invisible SVG containing standard color matrix filters for Protanopia, Deuteranopia, and Tritanopia.
 * Follows mathematically validated color blindness simulation matrices.
 */
export const AccessibilityFilters: React.FC = () => {
  return (
    <svg aria-hidden="true" className="sr-only" style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        {/* Protanopia (Red-Blind / L-cone deficiency) */}
        <filter id="protanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.567, 0.433, 0,     0, 0
                    0.558, 0.442, 0,     0, 0
                    0,     0.242, 0.758, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>

        {/* Deuteranopia (Green-Blind / M-cone deficiency) */}
        <filter id="deuteranopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.625, 0.375, 0,   0, 0
                    0.700, 0.300, 0,   0, 0
                    0,     0.300, 0.700, 0, 0
                    0,     0,     0,   1, 0"
          />
        </filter>

        {/* Tritanopia (Blue-Blind / S-cone deficiency) */}
        <filter id="tritanopia-filter">
          <feColorMatrix
            type="matrix"
            values="0.950, 0.050, 0,     0, 0
                    0,     0.433, 0.567, 0, 0
                    0,     0.475, 0.525, 0, 0
                    0,     0,     0,     1, 0"
          />
        </filter>
      </defs>
    </svg>
  );
};
