import { hotelTokens } from "@/lib/theme"
import { RoomVariant } from "../types"
import {
    Button,
    Paper,
    Box,
    Typography,
    Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link,
    Skeleton,
    useTheme,
    alpha
} from "@mui/material"
import {
    Hotel,
    Bed,
    Person,
    Restaurant,
    Wifi,
    LocalParking,
    Pool,
    FitnessCenter,
    Spa,
    LocationOn,
    PolicyOutlined,
    EditNote,
    LocalOffer,
    CheckCircle
} from "@mui/icons-material"
import { useResponsiveTheme } from "@/lib/utils/hooks/useTheme"
import OptimizedImage from "@/components/ui/Media/Image/OptimizedImage"
import OptimizedVideo from "@/components/ui/Media/Video/OptimizedVideo"
import { useRef, useState } from "react"

// Icon mapping using MUI icons instead of emojis
const iconMap: { [key: string]: React.ReactNode } = {
    room: <Hotel fontSize="small" />,
    bed: <Bed fontSize="small" />,
    person: <Person fontSize="small" />,
    restaurant: <Restaurant fontSize="small" />,
    wifi: <Wifi fontSize="small" />,
    parking: <LocalParking fontSize="small" />,
    pool: <Pool fontSize="small" />,
    gym: <FitnessCenter fontSize="small" />,
    spa: <Spa fontSize="small" />
}

interface VariantCardProps {
    variant: RoomVariant
    onSelect: (variantId: string) => void
    isSelected?: boolean
    loading?: boolean
    media: any
    mediaType: 'video' | 'image' | null
}

function VariantCardSkeleton() {
    return (
        <Paper
            elevation={1}
            sx={{
                borderRadius: 2,
                overflow: 'hidden',
                height: '100%'
            }}
        >
            <Skeleton variant="rectangular" height={200} />
            <Box sx={{ p: 2 }}>
                <Skeleton variant="text" width="80%" height={32} sx={{ mb: 2 }} />
                <Box sx={{ mb: 2 }}>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
                            <Skeleton variant="text" width="60%" />
                        </Box>
                    ))}
                </Box>
                <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 1 }} />
                <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
            </Box>
        </Paper>
    )
}

export default function VariantCard({
    variant,
    onSelect,
    isSelected = false,
    loading = false,
    media,
    mediaType = "image"
}: VariantCardProps) {
    const theme = useTheme()
    const { tokens } = useResponsiveTheme()
    const [isMuted, setMuted] = useState(false)
    const videoPlayerRef = useRef(null);

    const hasDiscount = variant.total_price.offer_present && variant.total_price.promo?.discount
    const originalPrice = variant.total_price.total_price
    const discountedPrice = variant.total_price.discounted_price
    const discountPercentage = variant.total_price.promo?.discount

    if (loading) {
        return <VariantCardSkeleton />
    }


    console.log("MEDIA TAKEN : ", media)

    return (
        <Paper
            elevation={isSelected ? 4 : 1}
            sx={{
                borderRadius: 2,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: isSelected ? 2 : 1,
                borderColor: isSelected ? 'success.main' : 'divider',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    elevation: 3,
                    transform: 'translateY(-2px)',
                    borderColor: isSelected ? 'success.main' : 'primary.main'
                }
            }}
        >

            <Box
                sx={{
                    height: 200,
                    bgcolor: 'grey.200',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

                {

                    mediaType === "video" ?
                        <OptimizedVideo
                            src={media}
                            ref={videoPlayerRef}
                            muted={isMuted}

                            loop
                            style={{
                                width: 'auto',
                                height: '150%',
                                minWidth: '100%',
                                objectFit: 'cover',
                                transform: 'translateY(-25%)', // The videos in the data were mobile resolution so compensating for that :|
                            }}
                            height={'100%'}
                            width={'100%'}

                        />
                        :
                        media?.length > 0 ?
                            <OptimizedImage
                                fill
                                src={media}
                                alt="Placeholder"
                                style={{ objectFit: 'cover' }}
                            />
                            :
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    textAlign: 'center',
                                    px: 2,
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            >
                                Variant Image Placeholder
                            </Typography>
                }




                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)'
                    }}
                />


                {hasDiscount && (
                    <Chip
                        icon={<LocalOffer />}
                        label={`${discountPercentage}% off`}
                        color="primary"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            right: 12,
                            fontWeight: 600,
                            zIndex: 2
                        }}
                    />
                )}

                {isSelected && (
                    <Chip
                        icon={<CheckCircle />}
                        label="Selected"
                        color="success"
                        size="small"
                        sx={{
                            position: 'absolute',
                            top: 12,
                            left: 12,
                            fontWeight: 600,
                            zIndex: 2
                        }}
                    />
                )}
            </Box>

            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

                <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                        fontWeight: 600,
                        lineHeight: 1.3,
                        mb: 2
                    }}
                >
                    {variant.name}
                </Typography>

                <List dense sx={{ py: 0, mb: 2 }}>
                    {variant.display_properties.slice(0, 4).map((prop, index) => (
                        <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
                                {iconMap[prop.icon_name] || <LocationOn fontSize="small" />}
                            </ListItemIcon>
                            <ListItemText
                                primary={prop.display_name}
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    color: 'text.secondary'
                                }}
                            />
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary" display="block">
                        Price for 1 night
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
                        {variant.additional_info.short_tariff_notes}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, flexWrap: 'wrap' }}>
                        {hasDiscount && (
                            <Typography
                                variant="body2"
                                sx={{
                                    textDecoration: 'line-through',
                                    color: 'text.disabled'
                                }}
                            >
                                {variant.total_price.currency}{originalPrice.toLocaleString()}
                            </Typography>
                        )}
                        <Typography
                            variant="h6"
                            component="span"
                            sx={{
                                fontWeight: 700,
                                color: 'success.main'
                            }}
                        >
                            {variant.total_price.currency}{discountedPrice.toLocaleString()}
                        </Typography>
                    </Box>
                </Box>

                <Link
                    href="#"
                    underline="hover"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'success.main',
                        mb: 2,
                        fontSize: '0.875rem',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline'
                        }
                    }}
                >
                    <PolicyOutlined sx={{ fontSize: 16, mr: 0.5 }} />
                    Cancellation policy
                </Link>


                {variant.properties.allows_special_requests && (
                    <Box sx={{ mb: 2 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'flex', alignItems: 'center' }}
                        >
                            <EditNote sx={{ fontSize: 16, mr: 0.5 }} />
                            Select rooms to add special request
                        </Typography>
                    </Box>
                )}


                <Box sx={{ mt: 'auto' }}>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(variant.variant_id)
                        }
                        }
                        disabled={!variant.is_bookable}
                        variant={isSelected ? "contained" : "outlined"}
                        color={isSelected ? "success" : "primary"}
                        fullWidth
                        size="large"
                        sx={{
                            py: 1.5,
                            fontWeight: 600,
                            borderRadius: 2,
                            transition: 'all 0.2s ease-in-out',
                            ...(isSelected && {
                                background: alpha(theme.palette.success.main, 0.9),
                                '&:hover': {
                                    background: theme.palette.success.dark,
                                }
                            }),
                            ...(!variant.is_bookable && {
                                bgcolor: 'action.disabledBackground',
                                color: 'text.disabled',
                                cursor: 'not-allowed'
                            })
                        }}
                    >
                        {!variant.is_bookable
                            ? 'Not Available'
                            : isSelected
                                ? 'Selected'
                                : 'Select'
                        }
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}
