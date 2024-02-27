import { ThemeProvider, useTheme } from '@mui/material';
import useSettings from '../../../hooks/useSettings';

const SidenavTheme = ({ children }: any) => {
  const theme = useTheme();
  const { settings }: any = useSettings();
  const sidenavTheme = settings.themes[settings.layout1Settings.leftSidebar.theme] || theme;

  return <ThemeProvider theme={sidenavTheme}>{children}</ThemeProvider>;
};

export default SidenavTheme;
