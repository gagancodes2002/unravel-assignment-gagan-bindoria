import { NextResponse } from "next/server";
import roomData from '@/data/roomData.json'
import type RoomData from "@/modules/rooms/types/room.types";

// Asserting Type

const rooms = roomData as RoomData

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page') || '0');
    const pageSize = 10;

    const start = page * pageSize;
    const end = start + pageSize;

    // extracting rooms data from json object
    const extractedRooms = rooms?.rooms_by_serial_no[0]?.rooms

    const paginatedRooms = extractedRooms?.slice(start, end);

    return NextResponse.json(paginatedRooms);
}