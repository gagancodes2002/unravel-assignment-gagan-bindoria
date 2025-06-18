// Base types for reusable structures
interface CancellationRule {
    currently_here: boolean;
    title: string;
    sub_title: string;
    type: number;
    amount: number;
    currency: string;
    to_date: string | null;
    from_date: string | null;
}

interface CancellationTimeline {
    cancellation_rules: CancellationRule[];
    free_cancellation: number;
    no_show: number;
    no_show_description: string | null;
    free_cancellation_description: string;
}

interface Properties {
    passenger_names_required_for_booking: number;
    allows_extra_meals: boolean;
    allows_special_requests: boolean;
    allows_bedding_preference: boolean;
    min_stay: string;
    date_apply_min_stay: string;
    on_request: number;
}

interface DisplayProperty {
    name: string;
    display_name: string;
    icon_name: string;
    order: string;
    value: string;
}

interface AdditionalInfo {
    tariff_notes: string;
    short_tariff_notes: string;
}

interface CancellationInfoRule {
    date_info: string;
    description: string;
    cost: any; // Can be null or other types
}

interface CancellationInfo {
    free_cancellation: number;
    free_cancellation_info: string;
    free_cancel_description: string;
    free_amendment_description: string | null;
    cancellation_rules: CancellationInfoRule[];
}

interface ChargeValue {
    value: number;
    formatted: string;
}

interface OriginalCancellationRule {
    runno: number;
    to_date?: string;
    to_date_details?: string;
    from_date?: string;
    from_date_details?: string;
    amend_charge: ChargeValue;
    cancel_charge: ChargeValue;
    charge: ChargeValue;
}

interface OriginalCancellationInfo {
    count: number;
    rule: OriginalCancellationRule[];
}

interface PriceBreakUp {
    unravel_markup: number;
    total_sale_price: number;
    dotw_discounted_price: number;
    fixed_markup_price: number;
    dynamic_markup_price: number;
    base_price: number;
    unravel_commission: number;
    client_commission: number;
    final_discounted_price: number;
}

interface Promo {
    discount: number | null;
    offer_type: string | null;
    offer_title: string | null;
    offer_description: string | null;
    offer_condition: string | null;
    offer_note: string | null;
    offer_stay: string | null;
    offer_pay: string | null;
    offer_upgrade_to_room_id: string | null;
    offer_upgrade_to_meal_id: string | null;
    offer_discounted_nights: number | null;
    offer_total_price: number | null;
    offer_discounted_total_price: number | null;
}

interface PromoListItem {
    discount: number;
    offer_type: string;
    offer_title: string;
    offer_description: string;
    offer_condition: string | null;
    offer_note: string | null;
    offer_stay: string | null;
    offer_pay: string | null;
    offer_upgrade_to_room_id: string | null;
    offer_upgrade_to_meal_id: string | null;
    offer_discounted_nights: number | null;
    offer_total_price: number;
    offer_discounted_total_price: number;
}

interface Markup {
    fixed_markup: number;
    dynamic_markup: number;
}

interface MarkupShare {
    discount: number;
    client_commission: number;
    unravel_commission: number;
}

interface TotalPrice {
    total_price: number;
    discounted_price: number;
    total_price_rounded: number;
    discounted_price_rounded: number;
    currency: string;
    price_break_up: PriceBreakUp[];
    previous_price: number | null;
    previous_price_rounded: number | null;
    price_changed: boolean | null;
    offer_present: boolean;
    promo: Promo;
    promo_list: PromoListItem[];
    markup: Markup;
    markup_share: MarkupShare;
}

interface RoomVariant {
    cancellation_timeline: CancellationTimeline;
    old_cancellation_timeline: CancellationTimeline;
    is_discount: boolean;
    context: any; // Can be null or other types
    variant_code: string;
    variant_id: string;
    name: string;
    properties: Properties;
    display_properties: DisplayProperty[];
    additional_info: AdditionalInfo;
    cancellation_info: CancellationInfo;
    total_price: TotalPrice;
    is_bookable: boolean;
    valid_for_occupancy: any; // Can be null or other types
    price_info: string;
    original_cancellation_info: OriginalCancellationInfo;
    roomwise_coupon: any; // Can be null or other types
}

interface RoomCapacity {
    max_occupancy: number;
    max_adult_with_children: number;
    min_child_age: number;
    max_child_age: number;
    max_adult: number;
    max_extra_bed: number;
    max_children: number;
}

interface Promotions {
    count: number;
}

interface VideoUrl {
    med: string;
}

interface RoomImage {
    id: string,
    key: string,
    count: number,
    image_urls: string[],
    display_name: string
}

interface RoomProperties {
    room_capacity: RoomCapacity;
    bed_type: string;
    promotions: Promotions;
    video_url: VideoUrl;
    room_images?: RoomImage[]
}

// Main Room interface
export interface Room {
    name: string;
    room_type_code: string;
    variants_count: number;
    variants: RoomVariant[];
    images: any; // Can be null or array of image objects
    properties: RoomProperties;
    no_of_adults: number | null;
    no_of_children: number | null;
    no_of_total_adults: number | null;
    no_of_total_children: number | null;
    children_ages: number[] | null;
    passengers_details: any; // Can be null or passenger details object
    price: number | null;
    booking_code: string | null;
    booking_type: string | null;
    extra_bed: any; // Can be null or extra bed details
    bedding_preference: string | null;
    special_requests: string | null;
    cancellation_status: string | null;
    cancel_reason: string | null;
    booking_reference_number: string | null;
    additional_requests: any; // Can be null or additional requests object
    additional_services: any; // Can be null or additional services object
    supplier_reference: string | null;
    context: any; // Can be null or context object
    package_price: number | null;
    package_cancellation_info: any; // Can be null or cancellation info object
    package_cancellation_timeline: any; // Can be null or timeline object
}