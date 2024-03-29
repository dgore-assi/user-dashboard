/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import { Outlet } from 'react-router-dom';
import Footer from '../../Footer';
import Layout1Sidenav from './Layout1Sidenav';
import Layout1Topbar from './Layout1Topbar';
import useSettings from '../../../hooks/useSettings';
import { sideNavWidth, sidenavCompactWidth } from '../../../shared/constant/constant';
import SidenavTheme from '../../MatxTheme/SidenavTheme/SidenavTheme';
import MatxSuspenses from '../../MatxSuspense';

const Layout1Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.default,
}));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  overflowY: 'auto',
  overflowX: 'hidden',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: '100%',
  position: 'relative',
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
}));

interface LayoutContainerProps {
  width: string | number;
  secondarysidebar: {
    open: boolean;
    // Add other secondarysidebar props as needed
  };
}
const LayoutContainer = styled(Box)<LayoutContainerProps>(({ width, secondarysidebar }) => ({
  height: '100vh',
  display: 'flex',
  flexGrow: '1',
  flexDirection: 'column',
  verticalAlign: 'top',
  marginLeft: width,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  marginRight: secondarysidebar.open ? 50 : 0,
}));

const Layout1 = () => {
  const { settings, updateSettings }: any = useSettings();
  const { layout1Settings, secondarysidebar }: any = settings;
  const topbarTheme = settings.themes[layout1Settings.topbar.theme];
  const {
    leftSidebar: { mode: sidenavMode, show: showSidenav },
  } = layout1Settings;

  const getSidenavWidth = () => {
    switch (sidenavMode) {
      case 'full':
        return sideNavWidth;

      case 'compact':
        return sidenavCompactWidth;

      default:
        return '0px';
    }
  };

  const sidenavWidth = getSidenavWidth();
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const ref = useRef({ isMdScreen, settings });
  const layoutClasses = `theme-${theme.palette.type}`;

  useEffect(() => {
    const { settings } = ref.current;
    const sidebarMode = settings.layout1Settings.leftSidebar.mode;
    if (settings.layout1Settings.leftSidebar.show) {
      const mode = isMdScreen ? 'close' : sidebarMode;
      updateSettings({ layout1Settings: { leftSidebar: { mode } } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMdScreen]);

  return (
    <Layout1Root className={layoutClasses}>
      {showSidenav && sidenavMode !== 'close' && (
        <SidenavTheme>
          <Layout1Sidenav />
        </SidenavTheme>
      )}

      <LayoutContainer width={sidenavWidth} secondarysidebar={secondarysidebar}>
        {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
          <ThemeProvider theme={topbarTheme}>
            <Layout1Topbar fixed={true} className="elevation-z8" />
          </ThemeProvider>
        )}

        {settings.perfectScrollbar && (
          <StyledScrollBar>
            {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <Layout1Topbar />
              </ThemeProvider>
            )}
            <Box flexGrow={1} position="relative">
              <MatxSuspenses>
                <Outlet />
              </MatxSuspenses>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </StyledScrollBar>
        )}

        {!settings.perfectScrollbar && (
          <ContentBox>
            {layout1Settings.topbar.show && !layout1Settings.topbar.fixed && (
              <ThemeProvider theme={topbarTheme}>
                <Layout1Topbar />
              </ThemeProvider>
            )}

            <Box flexGrow={1} position="relative">
              <MatxSuspenses>
                <Outlet />
              </MatxSuspenses>
            </Box>

            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </ContentBox>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </LayoutContainer>

    </Layout1Root>
  );
};

export default React.memo(Layout1);
