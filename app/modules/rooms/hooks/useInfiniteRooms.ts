import { useInfiniteQuery } from "@tanstack/react-query"
import { Room } from "../types"
import { roomService } from "../services/roomService"


export const useInfiniteRooms = () => {
    return useInfiniteQuery<Room[], Error>({
        queryKey: ['rooms'],
        queryFn: ({ pageParam = 0 }) => roomService.fetchRooms(pageParam as number),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined;

            return allPages.length
        }

    })
}