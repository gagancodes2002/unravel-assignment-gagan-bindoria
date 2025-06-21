'use client'
import Link from 'next/link'
import { lazy, Usable, use, useMemo, useState } from 'react'
import { useGetRoomById } from '@/modules/rooms/hooks/useInfiniteRooms'
import RoomMediaSection from '@/modules/rooms/components/RoomMediaSection'
// import VariantCard from '@/modules/rooms/components/VariantCard'
const VariantCard = lazy(() => import('@/modules/rooms/components/VariantCard'))
import {
    Box,
    Container,
    Paper,
    Typography,
    Button,
    Grid,
    Skeleton,
    Alert,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Breadcrumbs,
    useTheme,
    useMediaQuery
} from '@mui/material'
import {
    Bed,
    Height,
    Person,
    ArrowBack,
    CheckCircle,
    Wifi,
    AcUnit,
    RoomService,
    Bathtub,
    BusinessCenter
} from '@mui/icons-material'

function RoomPageSkeleton() {
    return (
        <Container
            sx={{
                width: {
                    xs: '88vw',
                    sm: '52vw',

                }
            }}
            maxWidth="xl"
            disableGutters>
            <Paper elevation={1} sx={{ borderRadius: { xs: 0, sm: 2 }, mb: 2 }}>
                <Container sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Skeleton variant="text" width={140} height={40} />
                        <Skeleton variant="text" width={100} height={32} />
                    </Box>
                </Container>
            </Paper>

            <Container disableGutters sx={{ py: { xs: 2, sm: 4 } }}>
                <Box sx={{ mb: 4 }}>
                    <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
                </Box>

                <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, mb: 4, borderRadius: 2 }}>
                    <Box sx={{ mb: 3 }}>
                        <Skeleton variant="text" width="60%" height={48} sx={{ mb: 2 }} />

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Skeleton variant="text" width={120} height={24} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                                <Skeleton variant="text" width={150} height={24} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                                <Skeleton variant="text" width={180} height={24} />
                            </Grid>
                        </Grid>

                        <Paper
                            elevation={0}
                            sx={{
                                bgcolor: 'grey.50',
                                p: 3,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'grey.200'
                            }}
                        >
                            <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} />
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Skeleton variant="circular" width={20} height={20} sx={{ mr: 2 }} />
                                    <Skeleton variant="text" width={120} height={20} />
                                </Box>
                            ))}
                        </Paper>
                    </Box>
                </Paper>

                <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Skeleton variant="text" width="40%" height={40} />
                        <Skeleton variant="text" width={120} height={32} />
                    </Box>

                    <Grid container spacing={3}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Grid
                                size={{
                                    xs: 12,
                                    lg: 6,
                                    xl: 4,
                                }}
                                key={index}>
                                <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 2 }} />
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Container>
        </Container>
    )
}

type Params = {
    Id: string
}

export default function RoomPage({ params }: { params: Usable<Params> }) {
    const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const resolvedParams: Params = use(params);

    const {
        data,
        isLoading,
        error
    } = useGetRoomById(resolvedParams.Id);

    const room = useMemo(() => {
        return data
    }, [data, isLoading])

    const { media, mediaType } = useMemo(() => {
        if (!room) return { media: [], mediaType: null };

        const images = room.properties.room_images?.[0]?.image_urls || [];
        const videoUrl = room.properties.video_url?.med;

        if (videoUrl) {
            return { media: [videoUrl], mediaType: 'video' as const };
        } else if (images.length > 0) {
            return { media: images, mediaType: 'image' as const };
        } else {
            return { media: [], mediaType: null };
        }
    }, [room]);

    const handleVariantSelect = (variantId: string) => {
        setSelectedVariant(selectedVariant === variantId ? null : variantId)
    }

    const handleImageClick = (index: number) => {
        console.log('Open image at index:', index);
    }

    if (isLoading) {
        return <RoomPageSkeleton />;
    }

    if (error) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container maxWidth="sm">
                    <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                        <Alert severity="error" sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Error Loading Room
                            </Typography>
                            <Typography variant="body2">
                                {error.message}
                            </Typography>
                        </Alert>
                        <Button
                            component={Link}
                            href="/rooms"
                            variant="outlined"
                            startIcon={<ArrowBack />}
                        >
                            Back to Rooms
                        </Button>
                    </Paper>
                </Container>
            </Box>
        );
    }

    if (!room) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Container maxWidth="sm">
                    <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                        <Alert severity="warning" sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Room Not Found
                            </Typography>
                            <Typography variant="body2">
                                The room you're looking for doesn't exist.
                            </Typography>
                        </Alert>
                        <Button
                            component={Link}
                            href="/rooms"
                            variant="outlined"
                            startIcon={<ArrowBack />}
                        >
                            Back to Rooms
                        </Button>
                    </Paper>
                </Container>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl"
            sx={{
                paddingX: {
                    xs: 4
                }
            }}
        >
            <Paper elevation={1} sx={{ borderRadius: { xs: 0, sm: 2 }, mb: 2 }}>
                <Container sx={{ py: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Button
                                component={Link}
                                href="/rooms"
                                startIcon={<ArrowBack />}
                                sx={{ textTransform: 'none' }}
                            >
                                Back to Rooms
                            </Button>
                        </Breadcrumbs>
                        <Chip
                            label={`Room ID: ${resolvedParams?.Id}`}
                            size="small"
                            variant="outlined"
                        />
                    </Box>
                </Container>
            </Paper>

            <Container
                maxWidth="md"
                disableGutters sx={{ py: { xs: 2, sm: 4 } }}>
                <Box sx={{ mb: 4 }}>
                    <RoomMediaSection
                        room={room}
                        media={media}
                        mediaType={mediaType}
                        onImageClick={handleImageClick}
                    />
                </Box>

                <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, mb: 4, borderRadius: 2 }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.5rem' } }}>
                            {room.name}
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid container
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                    <Bed sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        {room.properties.bed_type} bed
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 4
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                    <Person sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        Up to {room.properties.room_capacity.max_occupancy} guests
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid
                                size={{
                                    xs: 12,
                                    sm: 12,
                                    md: 4
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                                    <Height sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        {room.properties.room_capacity.max_adult} adults, {room.properties.room_capacity.max_children} children
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                        <Paper
                            elevation={0}
                            sx={{
                                bgcolor: 'primary.50',
                                p: 3,
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'primary.100'
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                                <CheckCircle sx={{ mr: 1, color: 'primary.main' }} />
                                Room Features
                            </Typography>
                            <List dense sx={{ pt: 0 }}>
                                <ListItem sx={{ py: 0.5, px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <Wifi color="action" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Free WiFi"
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                                <ListItem sx={{ py: 0.5, px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <AcUnit color="action" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Air conditioning"
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                                <ListItem sx={{ py: 0.5, px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <Bathtub color="action" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Private bathroom"
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                                <ListItem sx={{ py: 0.5, px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <RoomService color="action" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary="Room service available"
                                        primaryTypographyProps={{ variant: 'body2' }}
                                    />
                                </ListItem>
                                {room.properties.room_capacity.max_extra_bed > 0 && (
                                    <ListItem sx={{ py: 0.5, px: 0 }}>
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <Bed color="action" fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`Extra bed available (max ${room.properties.room_capacity.max_extra_bed})`}
                                            primaryTypographyProps={{ variant: 'body2' }}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                    </Box>
                </Paper>

                <Paper elevation={1} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h4" component="h2" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                            Choose Your Rate
                        </Typography>
                        <Chip
                            label={`${room.variants_count} options available`}
                            color="primary"
                            variant="outlined"
                            size={isMobile ? "small" : "medium"}
                        />
                    </Box>

                    {room.variants && room.variants.length > 0 ? (
                        <Grid container spacing={3}>
                            {room.variants.map((variant, index) => (
                                <Grid
                                    size={{
                                        xs: 12,
                                        lg: 6,
                                        xl: 4,
                                    }}
                                    key={variant.variant_id}>
                                    <VariantCard
                                        media={media[index]}
                                        mediaType={mediaType}
                                        variant={variant}
                                        onSelect={handleVariantSelect}
                                        isSelected={selectedVariant === variant.variant_id}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 8 }}>
                            <Alert severity="info" sx={{ maxWidth: 400, mx: 'auto' }}>
                                <Typography variant="body1">
                                    No variants available for this room.
                                </Typography>
                            </Alert>
                        </Box>
                    )}

                    {selectedVariant && (
                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    borderRadius: 2,
                                    minWidth: { xs: '100%', sm: 'auto' }
                                }}
                            >
                                Continue with Selected Room
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Container>
    )
}