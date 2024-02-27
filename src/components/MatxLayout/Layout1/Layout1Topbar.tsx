import { Avatar, Hidden, IconButton, MenuItem, useMediaQuery } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import React from 'react';
import { Span } from '../../Typography';
import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewSharpIcon from '@mui/icons-material/PowerSettingsNewSharp';
import { themeShadows } from '../../MatxTheme/themeColors';
import { topBarHeight } from '../../../shared/constant/constant';
import useSettings from '../../../hooks/useSettings';
import useAuth from '../../../hooks/useAuth';
import { MatxMenu } from '../..';


const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled('div')(() => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary },
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' },
}));
interface Layout1TopbarProps {
  fixed?: boolean;
  className?: string;
}
export const Layout1Topbar: React.FC<Layout1TopbarProps> = () => {
  const theme = useTheme();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { settings, updateSettings }: any = useSettings();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user, logout }: any = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const updateSidebarMode = (sidebarSettings: { mode: string; }) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    const { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    console.log(mode, 'mode');

    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <MenuIcon />
          </StyledIconButton>
          <IconBox>
          </IconBox>
        </Box>
        <Box display="flex" alignItems="center">
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    <strong>{user?.firstName}</strong>
                  </Span>
                </Hidden>
                <Avatar src={user?.firstName} sx={{ cursor: 'pointer' }} />
              </UserMenu>
            }
          >
            <StyledItem onClick={logout}>
              <PowerSettingsNewSharpIcon />
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot >
  );
};

export default React.memo(Layout1Topbar);
