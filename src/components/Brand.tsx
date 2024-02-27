import { Box, styled } from '@mui/material';
import useSettings from '../hooks/useSettings';
interface ContentBoxProps {
  mode: string;
}
const ContentBox = styled(Box)<ContentBoxProps>(() => ({
  marginLeft: "35px",
  marginTop: "20px",
  marginBottom: "10px",
  fontSize: "20px",
  fontWeight: 500
}));
interface BrandProps {
  children: React.ReactNode;
}

export const Brand: React.FC<BrandProps> = () => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <Box >
      <ContentBox mode={mode}>
        Employee Details
      </ContentBox>
    </Box>
  );
};
