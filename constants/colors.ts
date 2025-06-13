const darkColors = {
  primary: '#4285F4',
  secondary: '#34A853',
  accent: '#FBBC05',
  background: '#121212',
  card: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#AAAAAA',
  border: '#333333',
  success: '#34A853',
  error: '#EA4335',
  highlight: '#4285F4',
  lightGreen: '#8AEAC0',
  lightBlue: '#8AD4EA',
};

const lightColors = {
  primary: '#4285F4',
  secondary: '#34A853',
  accent: '#FBBC05',
  background: '#FFFFFF',
  card: '#F5F5F5',
  text: '#000000',
  textSecondary: '#666666',
  border: '#E0E0E0',
  success: '#34A853',
  error: '#EA4335',
  highlight: '#4285F4',
  lightGreen: '#8AEAC0',
  lightBlue: '#8AD4EA',
};

export const getColors = (theme: 'light' | 'dark') => {
  return theme === 'light' ? lightColors : darkColors;
};

export default darkColors;