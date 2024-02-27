import { Hidden, Switch } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import React from 'react';
import Sidenav from '../../Sidenav';
import { themeShadows } from '../../MatxTheme/themeColors';
import { sideNavWidth, sidenavCompactWidth } from '../../../shared/constant/constant';
import { convertHexToRGB } from '../../../shared/utils/utils';
import useSettings from '../../../hooks/useSettings';
import { Brand } from '../../Brand';


interface SidebarNavRootProps {
  bgImgURL: string;
  primarybg: string;
  width: number;
  theme?: any;
}
const SidebarNavRoot = styled(Box)(({ bgImgURL, theme, width, primarybg }: SidebarNavRootProps) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: width,
  boxShadow: themeShadows[8],
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top',
  backgroundSize: 'cover',
  zIndex: 111,
  overflow: 'hidden',
  color: theme.palette.text.primary,
  transition: 'all 250ms ease-in-out',
  backgroundImage: `linear-gradient(to bottom, rgba(${primarybg}, 0.96), rgba(${primarybg}, 0.96)), url(${bgImgURL})`,
  '&:hover': {
    width: sideNavWidth,
    '& .sidenavHoverShow': {
      display: 'block',
    },
    '& .compactNavItem': {
      width: '100%',
      maxWidth: '100%',
      '& .nav-bullet': {
        display: 'block',
      },
      '& .nav-bullet-text': {
        display: 'none',
      },
    },
  },
}));

const NavListBox = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const Layout1Sidenav = () => {
  const theme = useTheme();
  const { settings, updateSettings }: any = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode, bgImgURL }: any = leftSidebar;

  const getSidenavWidth = () => {
    switch (mode) {
      case 'compact':
        return sidenavCompactWidth;
      default:
        return sideNavWidth;
    }
  };
  const primaryRGB = convertHexToRGB(theme.palette.primary.main);

  const updateSidebarMode = (sidebarSettings: any) => {
    updateSettings({
      layout1Settings: {
        leftSidebar: {
          ...sidebarSettings,
        },
      },
    });
  };

  const handleSidenavToggle = () => {
    updateSidebarMode({ mode: mode === 'compact' ? 'full' : 'compact' });
  };

  return (
    <SidebarNavRoot bgImgURL={bgImgURL} primarybg={primaryRGB} width={getSidenavWidth()}>
      <NavListBox>
        <Brand>
          <Hidden smDown>
            <Switch
              onChange={handleSidenavToggle}
              checked={leftSidebar.mode !== 'full'}
              color="secondary"
              size="small"
            />
          </Hidden>
        </Brand>
        <Sidenav />
      </NavListBox>
    </SidebarNavRoot>
  );
};

export default React.memo(Layout1Sidenav);
