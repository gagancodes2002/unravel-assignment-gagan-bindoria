'use client';

import ErrorBoundary from '@/components/ErrorBoundary';
import RoomList from './RoomList';

export default function RoomListWrapper() {
    return (
        <ErrorBoundary>
            <RoomList />
        </ErrorBoundary>
    )
}