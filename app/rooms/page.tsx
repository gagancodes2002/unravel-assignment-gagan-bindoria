


'use client';

import ErrorBoundary from "@/components/ErrorBoundary";
import RoomList from "@/modules/rooms/components/RoomList";
import { Container } from "@mui/material";


export default function InfiniteRoomsList() {



  return (
    <Container maxWidth="lg" sx={{ px: { xs: 3.5 }, py: { xs: 2, sm: 3 } }}>
      <ErrorBoundary>
        <RoomList />
      </ErrorBoundary>
    </Container>
  );
}