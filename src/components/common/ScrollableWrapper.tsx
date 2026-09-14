import { Box, type BoxProps } from '@mui/material';
import { forwardRef } from 'react';

interface ScrollableWrapperProps extends BoxProps {
  children: React.ReactNode;
}

const ScrollableWrapper = forwardRef<HTMLDivElement, ScrollableWrapperProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '&': {
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  }
);

ScrollableWrapper.displayName = 'ScrollableWrapper';

export default ScrollableWrapper;