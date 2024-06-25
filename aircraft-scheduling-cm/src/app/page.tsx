import { Box, Grid } from "@mui/material";

export default function Home() {
  return (
    <main className="text-center grow items-center">
      <Box className="grow h-20 text-white items-center">Aircraft Scheduling</Box>
      {/* <Box className="grow"> */}
        <Grid container spacing={8}>
          <Grid xs className="border-solid border-2 border-white">test</Grid>
          <Grid xs className="border-solid border-2 border-white">test</Grid>
          <Grid xs className="border-solid border-2 border-white">test</Grid>
        </Grid>
      {/* </Box> */}
    </main>
  );
}
