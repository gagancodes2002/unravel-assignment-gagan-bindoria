import { Box, Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import { FavoriteBorder, Favorite, Star } from "@mui/icons-material";
import { Room } from "../types";
import { useResponsiveTheme } from "@/lib/hooks/useTheme";
import { useMemo, useState } from "react";
import Image from "next/image";
import Carousel from "./Carousel";

export default function RoomCard({ room }: { room: Room }) {
    const { tokens, isMobile } = useResponsiveTheme();
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
    };

    const mediaObj: {
        type: string | null
        media: any[]
    } = useMemo(() => {
        // Order Video if present > Image if present > Nothing if both absent
        let payload: {
            type: string | null,
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
        <Box
            sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                aspectRatio: '20/19',
                backgroundColor: 'grey.200',
                minHeight: 200,
                boxSizing: 'border-box'
            }}
        >

            <Carousel media={mediaObj.media} mediaType={mediaObj.type} />






        </Box >
    )


    // return (
    //     <Box
    //         sx={{
    //             cursor: 'pointer',
    //             width: '100%', // Takes full width of grid item
    //             height: '100%', // Takes full height of grid item
    //             display: 'flex',
    //             flexDirection: 'column',
    //             transition: 'transform 0.2s ease',
    //             '&:hover': {
    //                 transform: 'scale(1.02)',
    //             }
    //         }}
    //     >
    //         {/* Image Section */}
    //         <Box
    //             className="image-container"
    //             sx={{
    //                 position: 'relative',
    //                 borderRadius: 2,
    //                 overflow: 'hidden',
    //                 aspectRatio: '4/3', // Consistent aspect ratio
    //                 marginBottom: 1.5,
    //                 backgroundColor: 'grey.200', // Fallback background
    //                 minHeight: 200, // Minimum height to prevent collapse
    //             }}
    //         >
    //             {/* Room Image */}
    //             <CardMedia
    //                 component="video"
    //                 image={room.properties.video_url || '/api/placeholder/400/300'}
    //                 alt={room.name}
    //                 sx={{
    //                     width: '100%',
    //                     height: '100%',
    //                     objectFit: 'cover',
    //                     transition: 'transform 0.3s ease',
    //                 }}
    //             />

    //             {/* Heart Icon - Airbnb Style */}
    //             <IconButton
    //                 onClick={handleLike}
    //                 sx={{
    //                     position: 'absolute',
    //                     top: 12,
    //                     right: 12,
    //                     backgroundColor: 'rgba(255, 255, 255, 0.9)',
    //                     backdropFilter: 'blur(10px)',
    //                     width: 32,
    //                     height: 32,
    //                     '&:hover': {
    //                         backgroundColor: 'rgba(255, 255, 255, 1)',
    //                         transform: 'scale(1.1)',
    //                     }
    //                 }}
    //             >
    //                 {isLiked ? (
    //                     <Favorite sx={{ fontSize: 16, color: '#FF385C' }} />
    //                 ) : (
    //                     <FavoriteBorder sx={{ fontSize: 16, color: '#222' }} />
    //                 )}
    //             </IconButton>

    //             {/* Premium Badge (if available) */}
    //             {room.variants?.[0]?.is_discount && (
    //                 <Box
    //                     sx={{
    //                         position: 'absolute',
    //                         top: 12,
    //                         left: 12,
    //                         backgroundColor: 'secondary.main',
    //                         color: 'white',
    //                         padding: '4px 8px',
    //                         borderRadius: 1,
    //                         fontSize: '0.75rem',
    //                         fontWeight: 600,
    //                     }}
    //                 >
    //                     Deal
    //                 </Box>
    //             )}
    //         </Box>

    //         {/* Content Section */}
    //         <Box
    //             sx={{
    //                 padding: 0,
    //                 flexGrow: 1, // Takes remaining space
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 justifyContent: 'space-between',
    //             }}
    //         >
    //             {/* Location and Rating Row */}
    //             <Box
    //                 sx={{
    //                     display: 'flex',
    //                     justifyContent: 'space-between',
    //                     alignItems: 'flex-start',
    //                     marginBottom: 0.5,
    //                 }}
    //             >
    //                 <Typography
    //                     variant="subtitle1"
    //                     sx={{
    //                         fontWeight: 600,
    //                         color: 'text.primary',
    //                         fontSize: '15px',
    //                         lineHeight: 1.2,
    //                         overflow: 'hidden',
    //                         textOverflow: 'ellipsis',
    //                         whiteSpace: 'nowrap',
    //                         flex: 1,
    //                         marginRight: 1,
    //                     }}
    //                 >
    //                     {room.name}
    //                 </Typography>

    //                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
    //                     <Star sx={{ fontSize: 12, color: '#222222' }} />
    //                     <Typography
    //                         variant="body2"
    //                         sx={{
    //                             fontSize: '14px',
    //                             fontWeight: 400,
    //                             color: 'text.primary',
    //                         }}
    //                     >
    //                         4.8
    //                     </Typography>
    //                 </Box>
    //             </Box>

    //             {/* Room Type/Description */}
    //             <Typography
    //                 variant="body2"
    //                 sx={{
    //                     color: 'text.secondary',
    //                     fontSize: '15px',
    //                     lineHeight: 1.2,
    //                     marginBottom: 0.5,
    //                     overflow: 'hidden',
    //                     textOverflow: 'ellipsis',
    //                     whiteSpace: 'nowrap',
    //                 }}
    //             >
    //                 {room.properties?.bed_type || 'Luxury room'} • {room.properties?.room_capacity?.max_adult || 2} guests
    //             </Typography>

    //             {/* Availability */}
    //             <Typography
    //                 variant="body2"
    //                 sx={{
    //                     color: 'text.secondary',
    //                     fontSize: '15px',
    //                     lineHeight: 1.2,
    //                     marginBottom: 1,
    //                 }}
    //             >
    //                 Available now
    //             </Typography>

    //             {/* Price Row - Airbnb Style */}
    //             <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
    //                 <Typography
    //                     variant="h6"
    //                     sx={{
    //                         fontWeight: 600,
    //                         fontSize: '16px',
    //                         color: 'text.primary',
    //                         lineHeight: 1.2,
    //                     }}
    //                 >
    //                     ${room.variants?.[0]?.total_price?.discounted_price_rounded || room.price || '199'}
    //                 </Typography>
    //                 <Typography
    //                     variant="body2"
    //                     sx={{
    //                         color: 'text.primary',
    //                         fontSize: '16px',
    //                         fontWeight: 400,
    //                     }}
    //                 >
    //                     night
    //                 </Typography>
    //             </Box>
    //         </Box>
    //     </Box>
    // );
}