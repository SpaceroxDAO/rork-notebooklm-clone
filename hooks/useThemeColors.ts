import { useThemeStore } from '@/store/themeStore';
import { getColors } from '@/constants/colors';

export function useThemeColors() {
  const { theme } = useThemeStore();
  return getColors(theme);
}