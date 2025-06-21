import OptimizedImage from "@/components/ui/Media/Image/OptimizedImage";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface ImageThumbnailsProps {
    mediaList: string[];
    hasMoreImages: boolean;
    remainingCount: number;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
}

export default function ImageThumbnails({
    mediaList,
    hasMoreImages,
    remainingCount,
    onMouseEnter,
    onMouseLeave
}: ImageThumbnailsProps) {
    return (
        <Box
            sx={{
                flex: '1 1 12%',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 1,
                minHeight: 0,
                alignItems: 'stretch'
            }}
        >
            {Array.from({ length: 4 }).map((_, index) => {
                const imageIndex = index + 1;
                const imageUrl = mediaList[imageIndex];
                const isLastThumbnail = index === 3;
                const showViewAll = isLastThumbnail && hasMoreImages;

                return (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            aspectRatio: '1/1',
                            borderRadius: 1,
                            overflow: 'hidden',
                            cursor: 'pointer',
                            backgroundColor: 'grey.300',
                            transition: 'transform 0.2s ease',
                            '&:hover': {
                                transform: 'scale(1.03)',
                                cursor: 'zoom-in',
                            }
                        }}
                        onMouseEnter={(e) => {
                            e.stopPropagation();
                            onMouseEnter(index + 1);
                        }}
                        onMouseLeave={(e) => {
                            e.stopPropagation();
                            onMouseLeave();
                        }}
                    >
                        {imageUrl && (
                            <OptimizedImage
                                src={imageUrl}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 25vw, 15vw"
                                alt={`Property image ${imageIndex + 1}`}
                            />
                        )}

                        {showViewAll && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    transition: 'backgroundColor 0.2s ease',
                                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' }
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    fontWeight="bold"
                                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                                >
                                    +{remainingCount}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                                        mt: 0.5,
                                        textAlign: 'center'
                                    }}
                                >
                                    View All
                                </Typography>
                            </Box>
                        )}

                        {!imageUrl && !showViewAll && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    inset: 0,
                                    backgroundColor: 'grey.200',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.7rem' }}>
                                    No Image
                                </Typography>
                            </Box>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
}
