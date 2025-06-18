import { Room } from "../types";
import { fetcher } from "../lib/fetcher";

const PAGE_SIZE = 10;

export const roomService = {
    fetchRooms: async (page: number): Promise<Room[]> => {
        return fetcher<Room[]>(`/api/rooms?page=${page}`);
    },
    fetchRoomById: async (roomId: string): Promise<Room> => {
        return fetcher<Room>(`/api/rooms/${roomId}`)
    }
};
