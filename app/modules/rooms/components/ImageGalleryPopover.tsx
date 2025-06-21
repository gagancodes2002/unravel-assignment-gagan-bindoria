import OptimizedImage from "@/components/ui/Media/Image/OptimizedImage";
import { Box, Grid, Popover, Typography } from "@mui/material";
import Image from "next/image";

interface ImageGalleryPopoverProps {
    open: boolean;
    onClose: () => void;
    mediaList: string[];
    currentIndex: number | null;
    isViewAll?: boolean;
}

export default function ImageGalleryPopover({
    open,
    onClose,
    mediaList,
    currentIndex,
    isViewAll = false
}: ImageGalleryPopoverProps) {
    if (isViewAll) {
        return (
            <Popover
                open={open}
                onClose={onClose}
                sx={{ pointerEvents: 'none' }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{
                        width: { xs: '80vw', sm: '40vw' },
                        position: "relative",
                        padding: 2
                    }}
                >
                    {mediaList.map((med, i) => (
                        <Grid
                            key={i}
                            size={4}
                            sx={{
                                position: 'relative',
                                aspectRatio: '1/1',
                                borderRadius: 1,
                                overflow: 'clip',
                            }}
                        >

                            <OptimizedImage
                                src={med}
                                fill
                                className="object-cover"
                                alt="Property image"
                            />

                        </Grid>
                    ))}
                </Grid>
            </Popover>
        );
    }

    return (
        <Popover
            open={open}
            onClose={onClose}
            sx={{ pointerEvents: 'none' }}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Box
                sx={{
                    width: '40vw',
                    aspectRatio: '20/18',
                    padding: 2,
                    position: 'relative'
                }}
            >
                {currentIndex !== null && mediaList[currentIndex] && (
                    <OptimizedImage
                        src={mediaList[currentIndex]}
                        fill
                        className="object-cover"
                        alt="Property preview"
                        priority
                    />
                )}
            </Box>
        </Popover>
    );
}