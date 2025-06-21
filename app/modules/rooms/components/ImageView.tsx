import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useState, useMemo } from "react";
import { useResponsiveTheme } from "@/lib/utils/hooks/useTheme";
import ImageGalleryPopover from "./ImageGalleryPopover";
import ImageThumbnails from "./ImageThumbnails";
import OptimizedImage from "@/components/ui/Media/Image/OptimizedImage";

interface ImageViewProps {
    media: string[];
    onImageClick?: (index: number) => void;
}

export default function ImageView({ media, onImageClick }: ImageViewProps) {
    const { isMobile } = useResponsiveTheme();
    const [currentIndex, setCurrentIndex] = useState<null | number>(null);

    const mediaList = useMemo(() => media.slice(0, 7), [media]);
    const hasMoreImages = media.length > 5;
    const remainingCount = media.length - 4;

    const handlePopover = (index: number) => setCurrentIndex(index);
    const handlePopoff = () => setCurrentIndex(null);

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1
            }}
        >
            <ImageGalleryPopover
                open={currentIndex === 4}
                onClose={handlePopoff}
                mediaList={mediaList}
                currentIndex={currentIndex}
                isViewAll={true}
            />

            <ImageGalleryPopover
                open={currentIndex !== null && currentIndex < 4}
                onClose={handlePopoff}
                mediaList={mediaList}
                currentIndex={currentIndex}
            />

            <Box
                sx={{
                    flex: '1 1 65%',
                    position: 'relative',
                    borderRadius: 1,
                    overflow: 'hidden',
                    backgroundColor: 'grey.300',
                    cursor: onImageClick ? 'pointer' : 'default',
                    transition: 'transform 0.2s ease',
                    '&:hover': onImageClick ? { transform: 'scale(1.01)' } : {}
                }}
                onMouseEnter={() => handlePopover(0)}
                onMouseLeave={handlePopoff}
                onClick={(e) => {
                    e.stopPropagation();
                    onImageClick?.(0)
                }
                }
            >
                {mediaList[0] && (
                    <OptimizedImage
                        src={mediaList[0]}
                        fill
                        className="object-cover"
                        sizes={isMobile ? "(max-width: 768px) 100vw" : "(max-width: 1200px) 50vw, 33vw"}
                        alt="Main property image"
                        priority
                    />
                )}
            </Box>

            {mediaList.length > 1 && (
                <ImageThumbnails
                    mediaList={mediaList}
                    hasMoreImages={hasMoreImages}
                    remainingCount={remainingCount}
                    onMouseEnter={handlePopover}
                    onMouseLeave={handlePopoff}
                />
            )}
        </Box>
    );
}