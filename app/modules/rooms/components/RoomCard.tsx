import { Room } from "../types";
import { useResponsiveTheme } from "@/lib/utils/hooks/useTheme";
import { useMemo, useState } from "react";
import ListRoomMediaSection from "./ListRoomMediaSection";

export default function RoomCard({ room, roomIndex }: { room: Room, roomIndex: number }) {
    const { tokens, isMobile } = useResponsiveTheme();
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const mediaObj: {
        type: 'video' | 'image' | null
        media: any[]
    } = useMemo(() => {
        // Order Video if present > Image if present > Nothing if both absent
        let payload: {
            type: 'video' | 'image' | null
            media: any[]
        } = {
            type: null,
            media: [],
        }

        if (room.properties?.video_url?.med) {
            payload.type = "video";
            payload.media.push(room.properties?.video_url?.med)
        }

        if (room.properties.room_images && room.properties?.room_images?.length > 0) {
            payload.type = "image";
            room.properties?.room_images?.forEach((roomImg) => {
                roomImg.image_urls?.forEach((elm) => payload.media.push(elm))
            })
        }


        return payload


    }, [room.properties])

    return (
        <ListRoomMediaSection media={mediaObj.media} roomIndex={roomIndex} mediaType={mediaObj.type} room={room} />
    )


}