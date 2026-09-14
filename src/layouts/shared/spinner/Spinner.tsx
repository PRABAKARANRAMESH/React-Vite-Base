import { Box, CircularProgress } from '@mui/material'

const Spinner = () => {
  return (
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress 
        size={80}
        thickness={1} 
        />
      </Box>
  )
}

export default Spinner