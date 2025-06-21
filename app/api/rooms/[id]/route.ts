import { NextRequest, NextResponse } from "next/server";
import roomsData from '@/data/roomData.json';
import type RoomData from "@/modules/rooms/types/room.types";


// Asserting Type
const rooms = roomsData as RoomData;

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const roomId = params.id;

        // Validate room ID
        if (!roomId) {
            return NextResponse.json(
                { error: 'Room ID is required' },
                { status: 400 }
            );
        }

        // In real implementation, fetch from database
        // const room = await db.rooms.findById(roomId);
        const room = rooms?.rooms_by_serial_no[0]?.rooms;



        if (!room) {
            return NextResponse.json(
                { error: 'Room not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(room[parseInt(roomId)]);

    } catch (error) {
        console.error('Error fetching room:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}