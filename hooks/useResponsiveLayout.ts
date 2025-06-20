import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

interface ResponsiveLayout {
  isTablet: boolean;
  isLandscape: boolean;
  screenWidth: number;
  screenHeight: number;
  contentPadding: number;
  cardWidth: number | string;
  buttonSpacing: number;
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xlarge: number;
  };
}

export function useResponsiveLayout(): ResponsiveLayout {
  const [dimensions, setDimensions] = useState(() => Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const { width, height } = dimensions;
  const isTablet = width >= 768;
  const isLandscape = width > height;

  return {
    isTablet,
    isLandscape,
    screenWidth: width,
    screenHeight: height,
    contentPadding: isTablet ? 40 : 20,
    cardWidth: isTablet ? (isLandscape ? '60%' : '80%') : '100%',
    buttonSpacing: isTablet ? 24 : 16,
    fontSize: {
      small: isTablet ? 16 : 12,
      medium: isTablet ? 18 : 14,
      large: isTablet ? 24 : 18,
      xlarge: isTablet ? 32 : 24,
    },
  };
}

