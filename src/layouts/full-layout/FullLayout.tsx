// import { useAppSelector, type RootState } from '@/store/store';
import { styled, Container, Box, useTheme } from '@mui/material';

import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import { useAppSelector, type RootState } from '@/store/store';
import Header from '../header/Header';


const MainWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
  backgroundColor: theme.palette.background.default, // note: 'palette', not 'pallate'
}));
  
  const PageWrapper = styled('div')(() => ({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    zIndex: 1,
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    height: '100vh',
  }));

  const FullLayout: FC = () => {
    const customizer = useAppSelector((state: RootState) => state.customizer);
    const theme = useTheme();
    // const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("lg"));
    return(
        <MainWrapper>
            <Sidebar />
            <PageWrapper className="page-wrapper"
            sx={{
                transition: theme.transitions.create('margin', {
                    duration: theme.transitions.duration.shortest,
                }),
                ...(customizer.isCollapse && {
                    [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
                }),
            }}>
                <Header/>
                <Container  sx={{maxWidth: '100% !important',flexGrow:1,display:"flex",flexDirection:'column',overflow:'hidden', p:"0 !important" }} >
                        <Outlet />
                </Container>
        </PageWrapper>
    </MainWrapper>
    );
}
export default FullLayout; 