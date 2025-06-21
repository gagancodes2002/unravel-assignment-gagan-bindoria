// To parse this data:
//
//   import { Convert, RoomData } from "./file";
//
//   const roomData = Convert.toRoomData(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface RoomData {
    hotel_details:      HotelDetails;
    rooms_by_serial_no: RoomsBySerialNo[];
    avail_id:           string;
}

export interface HotelDetails {
    item_id:            string;
    client_id:          null;
    display_name:       string;
    item_type:          string;
    item_sub_type:      null;
    name:               string;
    address:            Address;
    description:        string;
    images:             Image[];
    videos:             any[];
    new_videos:         NewVideo[];
    components:         null;
    location:           Location;
    prompts:            null;
    display_properties: any[];
    additional_info:    AdditionalInfoElement[];
    layout:             Layout[];
    is_default:         boolean;
    curator_info:       null;
    destination_info:   DestinationInfo;
    notes:              null;
    linkable_items:     null;
    bookable:           null;
    google_place_id:    string;
    reviews:            Review[];
    vendor_id:          string;
    action_text:        string;
    promo_list:         PromoList[];
    price_info:         PriceInfoClass;
    exclusive_coupons:  null;
    prompts_exist:      number;
    vendor_properties:  VendorProperty[];
    hotel_properties:   any[];
    tpa_properties:     any[];
    properties:         HotelDetailsProperties;
    new_properties:     NewProperty[];
    markup:             HotelDetailsMarkup;
    markup_share:       MarkupShare;
}

export interface AdditionalInfoElement {
    value:         AdditionalInfoValue;
    name:          string;
    display_name:  string;
    icon_url:      string;
    icon_name:     string;
    type:          string;
    color:         null;
    order:         number;
    display_limit: number;
    subtitle:      null;
    metadata:      null;
}

export interface AdditionalInfoValue {
    html: string;
}

export interface Address {
    city:           string;
    country:        string;
    country_code:   string;
    continent:      string;
    neighbourhood?: string;
}

export interface DestinationInfo {
    destination_id:          string;
    trip_available:          boolean;
    activity_available:      boolean;
    vacation_home_available: boolean;
}

export interface Image {
    twoX:   ThreeX;
    threeX: ThreeX;
}

export interface ThreeX {
    square:     string;
    portrait:   string;
    landscape:  string;
    thumbnail:  string;
    fullscreen: string;
    transcoded: string;
}

export interface Layout {
    value:         ValueElement[] | boolean | PurpleValue | null | string;
    name:          string;
    display_name:  string;
    icon_url:      string;
    icon_name:     null | string;
    type:          string;
    color:         null | string;
    order:         number;
    display_limit: number;
    subtitle:      null | string;
    metadata:      null;
}

export interface ValueElement {
    name?:         string;
    order:         number;
    icon_name:     string;
    display_name?: string;
    color?:        string;
    title?:        string;
    description?:  string;
}

export interface PurpleValue {
    title:               string;
    subtitle:            string;
    image_url:           string;
    page_title:          string;
    banner_redirect_url: string;
}

export interface Location {
    latitude:  number;
    longitude: number;
}

export interface HotelDetailsMarkup {
    markup:         number;
    dynamic_markup: number;
}

export interface MarkupShare {
    discount:           number;
    client_commission:  number;
    unravel_commission: number;
}

export interface NewProperty {
    value:         string[] | number | string;
    name:          string;
    display_name:  string;
    icon_url:      null | string;
    icon_name:     null;
    type:          null;
    color:         null | string;
    order:         number;
    display_limit: number;
    subtitle:      null;
    metadata:      null;
}

export interface NewVideo {
    item_id:        string;
    item_id_string: string;
    video_id:       string;
    position:       number;
    image:          Image;
    video_caption:  string;
    address:        Address;
    video_url:      VideoURL;
    prompt_list:    PromptList[];
}

export interface PromptList {
    usage:     number;
    prompt_id: string;
    text:      string;
    order:     number;
    type:      number;
}

export interface VideoURL {
    med: string;
}

export interface PriceInfoClass {
    is_discount_present: boolean;
    total_price:         number;
    discounted_price:    number;
    unit:                string;
}

export interface PromoList {
    offer_id:          null;
    date_info:         string;
    order:             number;
    tnc:               string[];
    tnc_title:         string;
    discount:          number;
    is_exclusive:      number;
    date_info_object:  DateInfoObject;
    metadata:          null;
    offer_type:        null;
    offer_title:       OfferTitle;
    offer_description: OfferDescription;
}

export interface DateInfoObject {
    valid_till: Date;
    valid_from: Date;
    book_from:  Date;
    book_till:  Date;
}

export type OfferDescription = "Avail this offer to get 28% off on your booking" | "Price shown for this room includes the discount";

export type OfferTitle = "28% off" | "25% off";

export interface HotelDetailsProperties {
    price:                DistFromCentre[];
    budget:               string;
    star_rating:          number;
    stay_awards:          string[];
    sub_heading:          null;
    redirect_url:         string;
    redirect_text:        string;
    review_summary:       ReviewSummary[];
    dist_from_centre:     DistFromCentre;
    primary_sub_category: string;
}

export interface DistFromCentre {
    text:  string;
    unit:  string;
    value: number;
    type?: string;
}

export interface ReviewSummary {
    tag:           string;
    source:        string;
    max_rating:    number;
    review_count:  number;
    review_rating: number;
}

export interface Review {
    id:           string;
    source_id:    number;
    source_url:   string;
    source_name:  string;
    source_title: string;
    description:  string;
    rating:       Rating;
    rating_text:  string;
    order:        number;
    icon_url:     string;
}

export interface Rating {
    value: string;
}

export interface VendorProperty {
    base_markup:         BaseMarkup;
    maxRoomCount:        number;
    childrenAgeRange:    ChildrenAgeRange;
    allowMultiSelection: boolean;
    price:               DistFromCentre[];
    checkInDate:         Date;
    checkOutDate:        Date;
    vendor_id:           number;
    product_id:          number;
    priority:            number;
}

export interface BaseMarkup {
    markup_type:    string;
    fixed_markup:   number;
    dynamic_markup: number;
}

export interface ChildrenAgeRange {
    max: number;
    min: number;
}

export interface RoomsBySerialNo {
    serial_no: number;
    rooms:     Room[];
}

export interface Room {
    name:                          string;
    room_type_code:                string;
    variants_count:                number;
    variants:                      Variant[];
    images:                        null;
    properties:                    RoomProperties;
    no_of_adults:                  null;
    no_of_children:                null;
    no_of_total_adults:            null;
    no_of_total_children:          null;
    children_ages:                 null;
    passengers_details:            null;
    price:                         null;
    booking_code:                  null;
    booking_type:                  null;
    extra_bed:                     null;
    bedding_preference:            null;
    special_requests:              null;
    cancellation_status:           null;
    cancel_reason:                 null;
    booking_reference_number:      null;
    additional_requests:           null;
    additional_services:           null;
    supplier_reference:            null;
    context:                       null;
    package_price:                 null;
    package_cancellation_info:     null;
    package_cancellation_timeline: null;
}

export interface RoomProperties {
    room_capacity:   RoomCapacity;
    bed_type:        BedType;
    promotions:      Promotions;
    video_url?:      VideoURL;
    room_amenities?: null;
    occupancy_info?: null;
    room_images?:    RoomImage[];
}

export type BedType = "DOUBLE";

export interface Promotions {
    count:    number;
    special?: Special[];
}

export interface Special {
    runno:        number;
    type:         Type;
    special_name: SpecialName;
    discount:     number;
    stay:         number;
}

export type SpecialName = "GET AWAY DEAL 25% OFF";

export type Type = "stayXGetDiscountPromotion" | "Unravel Offer";

export interface RoomCapacity {
    max_occupancy:           number;
    max_adult_with_children: number;
    min_child_age:           number;
    max_child_age:           number;
    max_adult:               number;
    max_extra_bed:           number;
    max_children:            number;
}

export interface RoomImage {
    id:           string;
    key:          Key;
    count:        number;
    image_urls:   string[];
    display_name: RoomImageDisplayName;
}

export type RoomImageDisplayName = "Room images";

export type Key = "room_images";

export interface Variant {
    cancellation_timeline:      CancellationTimeline;
    old_cancellation_timeline:  CancellationTimeline;
    is_discount:                boolean;
    context:                    null;
    variant_code:               string;
    variant_id:                 string;
    name:                       VariantName;
    properties:                 VariantProperties;
    display_properties:         DisplayProperty[];
    additional_info:            VariantAdditionalInfo;
    cancellation_info:          CancellationInfo;
    total_price:                TotalPrice;
    is_bookable:                boolean;
    valid_for_occupancy:        null;
    price_info:                 PriceInfoEnum;
    original_cancellation_info: OriginalCancellationInfo;
    roomwise_coupon:            null;
}

export interface VariantAdditionalInfo {
    tariff_notes:       string;
    short_tariff_notes: string;
}

export interface CancellationInfo {
    free_cancellation:          number;
    free_cancellation_info:     FreeCancellationInfo;
    free_cancel_description:    FreeCancelDescription | null;
    free_amendment_description: null;
    cancellation_rules:         CancellationInfoCancellationRule[];
}

export interface CancellationInfoCancellationRule {
    date_info:   DateInfo;
    description: string;
    cost:        null;
}

export type DateInfo = "After Thu, 19 Sep 2024 20:00 PM: " | "After Wed, 11 Sep 2024 00:00 AM: " | "After Mon, 23 Sep 2024 20:00 PM: " | "After Tue, 24 Sep 2024 07:00 AM: " | "After Thu, 19 Sep 2024 06:00 AM: " | "After Sun, 22 Sep 2024 20:00 PM: " | "After Tue, 24 Sep 2024 04:00 AM: " | "After Mon, 23 Sep 2024 06:00 AM: " | "After Mon, 23 Sep 2024 18:00 PM: " | "After Mon, 23 Sep 2024 16:00 PM: " | "After Mon, 23 Sep 2024 07:00 AM: " | "From Sun, 22 Sep 2024 12:00 PM to Mon, 23 Sep 2024 12:00 PM: " | "After Mon, 23 Sep 2024 12:00 PM: " | "From Tue, 24 Sep 2024 11:00 AM to Tue, 24 Sep 2024 19:59 PM: " | "After Tue, 24 Sep 2024 20:00 PM: " | "After Wed, 25 Sep 2024 20:00 PM: ";

export type FreeCancelDescription = "Free Cancellation \nFree Amendment";

export type FreeCancellationInfo = "Before Thu, 19 Sep 2024 20:00 PM " | "Cancellation Policy" | "Before Mon, 23 Sep 2024 20:00 PM " | "Before Tue, 24 Sep 2024 07:00 AM " | "Before Thu, 19 Sep 2024 06:00 AM " | "Before Sun, 22 Sep 2024 20:00 PM " | "Before Tue, 24 Sep 2024 04:00 AM " | "Before Mon, 23 Sep 2024 06:00 AM " | "Before Mon, 23 Sep 2024 18:00 PM " | "Before Mon, 23 Sep 2024 16:00 PM " | "Before Mon, 23 Sep 2024 07:00 AM " | "Before Sun, 22 Sep 2024 12:00 PM " | "Before Tue, 24 Sep 2024 10:59 AM ";

export interface CancellationTimeline {
    cancellation_rules:            CancellationTimelineCancellationRule[];
    free_cancellation:             number;
    no_show:                       number;
    no_show_description:           NoShowDescription | null;
    free_cancellation_description: FreeCancellationDescription | null;
}

export interface CancellationTimelineCancellationRule {
    currently_here: boolean;
    title:          Title;
    sub_title:      FreeCancellationDescription;
    type:           number;
    amount:         number;
    currency:       Currency;
    to_date:        Date | FromDateEnum;
    from_date:      Date | FromDateEnum;
}

export type Currency = "MYR";

export type FromDateEnum = "null";

export type FreeCancellationDescription = "Till 19 September, 20:00PM" | "After 19 September, 20:00PM" | "After 11 September, 00:00AM" | "Till 23 September, 20:00PM" | "After 23 September, 20:00PM" | "Till 24 September, 07:00AM" | "After 24 September, 07:00AM" | "Till 19 September, 06:00AM" | "After 19 September, 06:00AM" | "Till 22 September, 20:00PM" | "After 22 September, 20:00PM" | "Till 24 September, 04:00AM" | "After 24 September, 04:00AM" | "Till 23 September, 06:00AM" | "After 23 September, 06:00AM" | "Till 23 September, 18:00PM" | "After 23 September, 18:00PM" | "Till 23 September, 16:00PM" | "After 23 September, 16:00PM" | "Till 23 September, 07:00AM" | "After 23 September, 07:00AM" | "Till 22 September, 12:00PM" | "22 September, 12:00PM - 23 September, 12:00PM" | "After 23 September, 12:00PM" | "Till 24 September, 10:59AM" | "24 September, 11:00AM - 19:59PM" | "After 24 September, 20:00PM";

export type Title = "Free cancellation" | "Cancellation charge: " | "Cancellation not allowed";

export type NoShowDescription = "Complete amount will be charged for no show";

export interface DisplayProperty {
    name:         DisplayPropertyName;
    display_name: DisplayPropertyDisplayName;
    icon_name:    IconName;
    order:        string;
    value:        ValueEnum;
}

export type DisplayPropertyDisplayName = "Meals included" | "Bed type" | "Adult occupancy" | "Family occupancy";

export type IconName = "HOTEL/ROOM/breakfast" | "HOTEL/ROOM/bedroom" | "HOTEL/ROOM/adults" | "HOTEL/ROOM/family";

export type DisplayPropertyName = "meals_included" | "bed_type" | "adult_occupancy" | "family_occupancy";

export type ValueEnum = "Room only" | "Double bed" | "Upto 2 adults" | "Breakfast included in the price" | "Breakfast + Lunch/Dinner" | "Upto 3 adults with 1 extra bed(s)" | "Upto 2 adults and 1 children";

export type VariantName = "Room Only" | "Breakfast" | "Half Board";

export interface OriginalCancellationInfo {
    count: number;
    rule:  Rule[];
}

export interface Rule {
    runno:              number;
    to_date?:           Date;
    to_date_details?:   ToDateDetails;
    amend_charge?:      Charge;
    cancel_charge?:     Charge;
    charge?:            Charge;
    from_date?:         Date;
    from_date_details?: FromDateDetails;
    amend_restricted?:  boolean;
    cancel_restricted?: boolean;
    no_show_policy?:    boolean;
}

export interface Charge {
    value:     number;
    formatted: Formatted;
}

export type Formatted = "0.00" | "1,381.42" | "1,577.37" | "2,067.26" | "2,123.84" | "2,148.75" | "2,164.46" | "2,185.48" | "2,186.87" | "1,978.98" | "2,305.48" | "2,316.99" | "2,332.99" | "2,334.85" | "2,350.08" | "2,372.93" | "2,420.78" | "2,443.50" | "2,485.28" | "2,146.94" | "2,502.39" | "2,515.64" | "2,584.52" | "2,417.14" | "2,653.02" | "2,459.83" | "2,673.73" | "2,698.44" | "2,716.96" | "2,668.50" | "2,900.55" | "1,895.58" | "2,164.45" | "2,836.70" | "1,897.92" | "1,897.94" | "2,060.68" | "2,060.69" | "2,557.11" | "2,078.76" | "2,078.78" | "2,241.52" | "2,241.53";

export type FromDateDetails = "Thu, 19 Sep 2024 20:00:01" | "Wed, 11 Sep 2024 00:00:01" | "Mon, 23 Sep 2024 20:00:01" | "Tue, 24 Sep 2024 07:00:01" | "Thu, 19 Sep 2024 06:00:01" | "Sun, 22 Sep 2024 20:00:01" | "Tue, 24 Sep 2024 04:00:01" | "Mon, 23 Sep 2024 06:00:01" | "Mon, 23 Sep 2024 18:00:01" | "Mon, 23 Sep 2024 16:00:01" | "Mon, 23 Sep 2024 07:00:01" | "Sun, 22 Sep 2024 12:00:01" | "Mon, 23 Sep 2024 12:00:01" | "Tue, 24 Sep 2024 11:00:00" | "Tue, 24 Sep 2024 20:00:00" | "Wed, 25 Sep 2024 20:00:00";

export type ToDateDetails = "Thu, 19 Sep 2024 20:00:00" | "Mon, 23 Sep 2024 20:00:00" | "Tue, 24 Sep 2024 07:00:00" | "Thu, 19 Sep 2024 06:00:00" | "Sun, 22 Sep 2024 20:00:00" | "Tue, 24 Sep 2024 04:00:00" | "Mon, 23 Sep 2024 06:00:00" | "Mon, 23 Sep 2024 18:00:00" | "Mon, 23 Sep 2024 16:00:00" | "Mon, 23 Sep 2024 07:00:00" | "Sun, 22 Sep 2024 12:00:00" | "Mon, 23 Sep 2024 12:00:00" | "Tue, 24 Sep 2024 10:59:59" | "Tue, 24 Sep 2024 19:59:59";

export type PriceInfoEnum = "Price for 1 night";

export interface VariantProperties {
    passenger_names_required_for_booking: number;
    allows_extra_meals:                   boolean;
    allows_special_requests:              boolean;
    allows_bedding_preference:            boolean;
    min_stay:                             string;
    date_apply_min_stay:                  string;
    on_request:                           number;
}

export interface TotalPrice {
    total_price:              number;
    discounted_price:         number;
    total_price_rounded:      number;
    discounted_price_rounded: number;
    currency:                 Currency;
    price_break_up:           PriceBreakUp[];
    previous_price:           null;
    previous_price_rounded:   null;
    price_changed:            null;
    offer_present:            boolean;
    promo:                    Promo;
    promo_list:               Promo[];
    markup:                   TotalPriceMarkup;
    markup_share:             MarkupShare;
}

export interface TotalPriceMarkup {
    fixed_markup:   number;
    dynamic_markup: number;
}

export interface PriceBreakUp {
    unravel_markup:         number;
    total_sale_price:       number;
    dotw_discounted_price:  number;
    fixed_markup_price:     number;
    dynamic_markup_price:   number;
    base_price:             number;
    unravel_commission:     number;
    client_commission:      number;
    final_discounted_price: number;
}

export interface Promo {
    discount:                     number | null;
    offer_type:                   Type | null;
    offer_title:                  OfferTitle | null;
    offer_description:            OfferDescription | null;
    offer_condition:              null;
    offer_note:                   null;
    offer_stay:                   number | null;
    offer_pay:                    null;
    offer_upgrade_to_room_id:     null;
    offer_upgrade_to_meal_id:     null;
    offer_discounted_nights:      null;
    offer_total_price:            number | null;
    offer_discounted_total_price: number | null;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toRoomData(json: string): RoomData {
        return cast(JSON.parse(json), r("RoomData"));
    }

    public static roomDataToJson(value: RoomData): string {
        return JSON.stringify(uncast(value, r("RoomData")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "RoomData": o([
        { json: "hotel_details", js: "hotel_details", typ: r("HotelDetails") },
        { json: "rooms_by_serial_no", js: "rooms_by_serial_no", typ: a(r("RoomsBySerialNo")) },
        { json: "avail_id", js: "avail_id", typ: "" },
    ], false),
    "HotelDetails": o([
        { json: "item_id", js: "item_id", typ: "" },
        { json: "client_id", js: "client_id", typ: null },
        { json: "display_name", js: "display_name", typ: "" },
        { json: "item_type", js: "item_type", typ: "" },
        { json: "item_sub_type", js: "item_sub_type", typ: null },
        { json: "name", js: "name", typ: "" },
        { json: "address", js: "address", typ: r("Address") },
        { json: "description", js: "description", typ: "" },
        { json: "images", js: "images", typ: a(r("Image")) },
        { json: "videos", js: "videos", typ: a("any") },
        { json: "new_videos", js: "new_videos", typ: a(r("NewVideo")) },
        { json: "components", js: "components", typ: null },
        { json: "location", js: "location", typ: r("Location") },
        { json: "prompts", js: "prompts", typ: null },
        { json: "display_properties", js: "display_properties", typ: a("any") },
        { json: "additional_info", js: "additional_info", typ: a(r("AdditionalInfoElement")) },
        { json: "layout", js: "layout", typ: a(r("Layout")) },
        { json: "is_default", js: "is_default", typ: true },
        { json: "curator_info", js: "curator_info", typ: null },
        { json: "destination_info", js: "destination_info", typ: r("DestinationInfo") },
        { json: "notes", js: "notes", typ: null },
        { json: "linkable_items", js: "linkable_items", typ: null },
        { json: "bookable", js: "bookable", typ: null },
        { json: "google_place_id", js: "google_place_id", typ: "" },
        { json: "reviews", js: "reviews", typ: a(r("Review")) },
        { json: "vendor_id", js: "vendor_id", typ: "" },
        { json: "action_text", js: "action_text", typ: "" },
        { json: "promo_list", js: "promo_list", typ: a(r("PromoList")) },
        { json: "price_info", js: "price_info", typ: r("PriceInfoClass") },
        { json: "exclusive_coupons", js: "exclusive_coupons", typ: null },
        { json: "prompts_exist", js: "prompts_exist", typ: 0 },
        { json: "vendor_properties", js: "vendor_properties", typ: a(r("VendorProperty")) },
        { json: "hotel_properties", js: "hotel_properties", typ: a("any") },
        { json: "tpa_properties", js: "tpa_properties", typ: a("any") },
        { json: "properties", js: "properties", typ: r("HotelDetailsProperties") },
        { json: "new_properties", js: "new_properties", typ: a(r("NewProperty")) },
        { json: "markup", js: "markup", typ: r("HotelDetailsMarkup") },
        { json: "markup_share", js: "markup_share", typ: r("MarkupShare") },
    ], false),
    "AdditionalInfoElement": o([
        { json: "value", js: "value", typ: r("AdditionalInfoValue") },
        { json: "name", js: "name", typ: "" },
        { json: "display_name", js: "display_name", typ: "" },
        { json: "icon_url", js: "icon_url", typ: "" },
        { json: "icon_name", js: "icon_name", typ: "" },
        { json: "type", js: "type", typ: "" },
        { json: "color", js: "color", typ: null },
        { json: "order", js: "order", typ: 0 },
        { json: "display_limit", js: "display_limit", typ: 0 },
        { json: "subtitle", js: "subtitle", typ: null },
        { json: "metadata", js: "metadata", typ: null },
    ], false),
    "AdditionalInfoValue": o([
        { json: "html", js: "html", typ: "" },
    ], false),
    "Address": o([
        { json: "city", js: "city", typ: "" },
        { json: "country", js: "country", typ: "" },
        { json: "country_code", js: "country_code", typ: "" },
        { json: "continent", js: "continent", typ: "" },
        { json: "neighbourhood", js: "neighbourhood", typ: u(undefined, "") },
    ], false),
    "DestinationInfo": o([
        { json: "destination_id", js: "destination_id", typ: "" },
        { json: "trip_available", js: "trip_available", typ: true },
        { json: "activity_available", js: "activity_available", typ: true },
        { json: "vacation_home_available", js: "vacation_home_available", typ: true },
    ], false),
    "Image": o([
        { json: "twoX", js: "twoX", typ: r("ThreeX") },
        { json: "threeX", js: "threeX", typ: r("ThreeX") },
    ], false),
    "ThreeX": o([
        { json: "square", js: "square", typ: "" },
        { json: "portrait", js: "portrait", typ: "" },
        { json: "landscape", js: "landscape", typ: "" },
        { json: "thumbnail", js: "thumbnail", typ: "" },
        { json: "fullscreen", js: "fullscreen", typ: "" },
        { json: "transcoded", js: "transcoded", typ: "" },
    ], false),
    "Layout": o([
        { json: "value", js: "value", typ: u(a(r("ValueElement")), true, r("PurpleValue"), null, "") },
        { json: "name", js: "name", typ: "" },
        { json: "display_name", js: "display_name", typ: "" },
        { json: "icon_url", js: "icon_url", typ: "" },
        { json: "icon_name", js: "icon_name", typ: u(null, "") },
        { json: "type", js: "type", typ: "" },
        { json: "color", js: "color", typ: u(null, "") },
        { json: "order", js: "order", typ: 0 },
        { json: "display_limit", js: "display_limit", typ: 0 },
        { json: "subtitle", js: "subtitle", typ: u(null, "") },
        { json: "metadata", js: "metadata", typ: null },
    ], false),
    "ValueElement": o([
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "order", js: "order", typ: 0 },
        { json: "icon_name", js: "icon_name", typ: "" },
        { json: "display_name", js: "display_name", typ: u(undefined, "") },
        { json: "color", js: "color", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
    ], false),
    "PurpleValue": o([
        { json: "title", js: "title", typ: "" },
        { json: "subtitle", js: "subtitle", typ: "" },
        { json: "image_url", js: "image_url", typ: "" },
        { json: "page_title", js: "page_title", typ: "" },
        { json: "banner_redirect_url", js: "banner_redirect_url", typ: "" },
    ], false),
    "Location": o([
        { json: "latitude", js: "latitude", typ: 3.14 },
        { json: "longitude", js: "longitude", typ: 3.14 },
    ], false),
    "HotelDetailsMarkup": o([
        { json: "markup", js: "markup", typ: 3.14 },
        { json: "dynamic_markup", js: "dynamic_markup", typ: 3.14 },
    ], false),
    "MarkupShare": o([
        { json: "discount", js: "discount", typ: 3.14 },
        { json: "client_commission", js: "client_commission", typ: 0 },
        { json: "unravel_commission", js: "unravel_commission", typ: 3.14 },
    ], false),
    "NewProperty": o([
        { json: "value", js: "value", typ: u(a(""), 3.14, "") },
        { json: "name", js: "name", typ: "" },
        { json: "display_name", js: "display_name", typ: "" },
        { json: "icon_url", js: "icon_url", typ: u(null, "") },
        { json: "icon_name", js: "icon_name", typ: null },
        { json: "type", js: "type", typ: null },
        { json: "color", js: "color", typ: u(null, "") },
        { json: "order", js: "order", typ: 0 },
        { json: "display_limit", js: "display_limit", typ: 0 },
        { json: "subtitle", js: "subtitle", typ: null },
        { json: "metadata", js: "metadata", typ: null },
    ], false),
    "NewVideo": o([
        { json: "item_id", js: "item_id", typ: "" },
        { json: "item_id_string", js: "item_id_string", typ: "" },
        { json: "video_id", js: "video_id", typ: "" },
        { json: "position", js: "position", typ: 0 },
        { json: "image", js: "image", typ: r("Image") },
        { json: "video_caption", js: "video_caption", typ: "" },
        { json: "address", js: "address", typ: r("Address") },
        { json: "video_url", js: "video_url", typ: r("VideoURL") },
        { json: "prompt_list", js: "prompt_list", typ: a(r("PromptList")) },
    ], false),
    "PromptList": o([
        { json: "usage", js: "usage", typ: 0 },
        { json: "prompt_id", js: "prompt_id", typ: "" },
        { json: "text", js: "text", typ: "" },
        { json: "order", js: "order", typ: 0 },
        { json: "type", js: "type", typ: 0 },
    ], false),
    "VideoURL": o([
        { json: "med", js: "med", typ: "" },
    ], false),
    "PriceInfoClass": o([
        { json: "is_discount_present", js: "is_discount_present", typ: true },
        { json: "total_price", js: "total_price", typ: 0 },
        { json: "discounted_price", js: "discounted_price", typ: 0 },
        { json: "unit", js: "unit", typ: "" },
    ], false),
    "PromoList": o([
        { json: "offer_id", js: "offer_id", typ: null },
        { json: "date_info", js: "date_info", typ: "" },
        { json: "order", js: "order", typ: 0 },
        { json: "tnc", js: "tnc", typ: a("") },
        { json: "tnc_title", js: "tnc_title", typ: "" },
        { json: "discount", js: "discount", typ: 0 },
        { json: "is_exclusive", js: "is_exclusive", typ: 0 },
        { json: "date_info_object", js: "date_info_object", typ: r("DateInfoObject") },
        { json: "metadata", js: "metadata", typ: null },
        { json: "offer_type", js: "offer_type", typ: null },
        { json: "offer_title", js: "offer_title", typ: r("OfferTitle") },
        { json: "offer_description", js: "offer_description", typ: r("OfferDescription") },
    ], false),
    "DateInfoObject": o([
        { json: "valid_till", js: "valid_till", typ: Date },
        { json: "valid_from", js: "valid_from", typ: Date },
        { json: "book_from", js: "book_from", typ: Date },
        { json: "book_till", js: "book_till", typ: Date },
    ], false),
    "HotelDetailsProperties": o([
        { json: "price", js: "price", typ: a(r("DistFromCentre")) },
        { json: "budget", js: "budget", typ: "" },
        { json: "star_rating", js: "star_rating", typ: 0 },
        { json: "stay_awards", js: "stay_awards", typ: a("") },
        { json: "sub_heading", js: "sub_heading", typ: null },
        { json: "redirect_url", js: "redirect_url", typ: "" },
        { json: "redirect_text", js: "redirect_text", typ: "" },
        { json: "review_summary", js: "review_summary", typ: a(r("ReviewSummary")) },
        { json: "dist_from_centre", js: "dist_from_centre", typ: r("DistFromCentre") },
        { json: "primary_sub_category", js: "primary_sub_category", typ: "" },
    ], false),
    "DistFromCentre": o([
        { json: "text", js: "text", typ: "" },
        { json: "unit", js: "unit", typ: "" },
        { json: "value", js: "value", typ: 3.14 },
        { json: "type", js: "type", typ: u(undefined, "") },
    ], false),
    "ReviewSummary": o([
        { json: "tag", js: "tag", typ: "" },
        { json: "source", js: "source", typ: "" },
        { json: "max_rating", js: "max_rating", typ: 0 },
        { json: "review_count", js: "review_count", typ: 0 },
        { json: "review_rating", js: "review_rating", typ: 0 },
    ], false),
    "Review": o([
        { json: "id", js: "id", typ: "" },
        { json: "source_id", js: "source_id", typ: 0 },
        { json: "source_url", js: "source_url", typ: "" },
        { json: "source_name", js: "source_name", typ: "" },
        { json: "source_title", js: "source_title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "rating", js: "rating", typ: r("Rating") },
        { json: "rating_text", js: "rating_text", typ: "" },
        { json: "order", js: "order", typ: 0 },
        { json: "icon_url", js: "icon_url", typ: "" },
    ], false),
    "Rating": o([
        { json: "value", js: "value", typ: "" },
    ], false),
    "VendorProperty": o([
        { json: "base_markup", js: "base_markup", typ: r("BaseMarkup") },
        { json: "maxRoomCount", js: "maxRoomCount", typ: 0 },
        { json: "childrenAgeRange", js: "childrenAgeRange", typ: r("ChildrenAgeRange") },
        { json: "allowMultiSelection", js: "allowMultiSelection", typ: true },
        { json: "price", js: "price", typ: a(r("DistFromCentre")) },
        { json: "checkInDate", js: "checkInDate", typ: Date },
        { json: "checkOutDate", js: "checkOutDate", typ: Date },
        { json: "vendor_id", js: "vendor_id", typ: 0 },
        { json: "product_id", js: "product_id", typ: 0 },
        { json: "priority", js: "priority", typ: 0 },
    ], false),
    "BaseMarkup": o([
        { json: "markup_type", js: "markup_type", typ: "" },
        { json: "fixed_markup", js: "fixed_markup", typ: 3.14 },
        { json: "dynamic_markup", js: "dynamic_markup", typ: 0 },
    ], false),
    "ChildrenAgeRange": o([
        { json: "max", js: "max", typ: 0 },
        { json: "min", js: "min", typ: 0 },
    ], false),
    "RoomsBySerialNo": o([
        { json: "serial_no", js: "serial_no", typ: 0 },
        { json: "rooms", js: "rooms", typ: a(r("Room")) },
    ], false),
    "Room": o([
        { json: "name", js: "name", typ: "" },
        { json: "room_type_code", js: "room_type_code", typ: "" },
        { json: "variants_count", js: "variants_count", typ: 0 },
        { json: "variants", js: "variants", typ: a(r("Variant")) },
        { json: "images", js: "images", typ: null },
        { json: "properties", js: "properties", typ: r("RoomProperties") },
        { json: "no_of_adults", js: "no_of_adults", typ: null },
        { json: "no_of_children", js: "no_of_children", typ: null },
        { json: "no_of_total_adults", js: "no_of_total_adults", typ: null },
        { json: "no_of_total_children", js: "no_of_total_children", typ: null },
        { json: "children_ages", js: "children_ages", typ: null },
        { json: "passengers_details", js: "passengers_details", typ: null },
        { json: "price", js: "price", typ: null },
        { json: "booking_code", js: "booking_code", typ: null },
        { json: "booking_type", js: "booking_type", typ: null },
        { json: "extra_bed", js: "extra_bed", typ: null },
        { json: "bedding_preference", js: "bedding_preference", typ: null },
        { json: "special_requests", js: "special_requests", typ: null },
        { json: "cancellation_status", js: "cancellation_status", typ: null },
        { json: "cancel_reason", js: "cancel_reason", typ: null },
        { json: "booking_reference_number", js: "booking_reference_number", typ: null },
        { json: "additional_requests", js: "additional_requests", typ: null },
        { json: "additional_services", js: "additional_services", typ: null },
        { json: "supplier_reference", js: "supplier_reference", typ: null },
        { json: "context", js: "context", typ: null },
        { json: "package_price", js: "package_price", typ: null },
        { json: "package_cancellation_info", js: "package_cancellation_info", typ: null },
        { json: "package_cancellation_timeline", js: "package_cancellation_timeline", typ: null },
    ], false),
    "RoomProperties": o([
        { json: "room_capacity", js: "room_capacity", typ: r("RoomCapacity") },
        { json: "bed_type", js: "bed_type", typ: r("BedType") },
        { json: "promotions", js: "promotions", typ: r("Promotions") },
        { json: "video_url", js: "video_url", typ: u(undefined, r("VideoURL")) },
        { json: "room_amenities", js: "room_amenities", typ: u(undefined, null) },
        { json: "occupancy_info", js: "occupancy_info", typ: u(undefined, null) },
        { json: "room_images", js: "room_images", typ: u(undefined, a(r("RoomImage"))) },
    ], false),
    "Promotions": o([
        { json: "count", js: "count", typ: 0 },
        { json: "special", js: "special", typ: u(undefined, a(r("Special"))) },
    ], false),
    "Special": o([
        { json: "runno", js: "runno", typ: 0 },
        { json: "type", js: "type", typ: r("Type") },
        { json: "special_name", js: "special_name", typ: r("SpecialName") },
        { json: "discount", js: "discount", typ: 0 },
        { json: "stay", js: "stay", typ: 0 },
    ], false),
    "RoomCapacity": o([
        { json: "max_occupancy", js: "max_occupancy", typ: 0 },
        { json: "max_adult_with_children", js: "max_adult_with_children", typ: 0 },
        { json: "min_child_age", js: "min_child_age", typ: 0 },
        { json: "max_child_age", js: "max_child_age", typ: 0 },
        { json: "max_adult", js: "max_adult", typ: 0 },
        { json: "max_extra_bed", js: "max_extra_bed", typ: 0 },
        { json: "max_children", js: "max_children", typ: 0 },
    ], false),
    "RoomImage": o([
        { json: "id", js: "id", typ: "" },
        { json: "key", js: "key", typ: r("Key") },
        { json: "count", js: "count", typ: 0 },
        { json: "image_urls", js: "image_urls", typ: a("") },
        { json: "display_name", js: "display_name", typ: r("RoomImageDisplayName") },
    ], false),
    "Variant": o([
        { json: "cancellation_timeline", js: "cancellation_timeline", typ: r("CancellationTimeline") },
        { json: "old_cancellation_timeline", js: "old_cancellation_timeline", typ: r("CancellationTimeline") },
        { json: "is_discount", js: "is_discount", typ: true },
        { json: "context", js: "context", typ: null },
        { json: "variant_code", js: "variant_code", typ: "" },
        { json: "variant_id", js: "variant_id", typ: "" },
        { json: "name", js: "name", typ: r("VariantName") },
        { json: "properties", js: "properties", typ: r("VariantProperties") },
        { json: "display_properties", js: "display_properties", typ: a(r("DisplayProperty")) },
        { json: "additional_info", js: "additional_info", typ: r("VariantAdditionalInfo") },
        { json: "cancellation_info", js: "cancellation_info", typ: r("CancellationInfo") },
        { json: "total_price", js: "total_price", typ: r("TotalPrice") },
        { json: "is_bookable", js: "is_bookable", typ: true },
        { json: "valid_for_occupancy", js: "valid_for_occupancy", typ: null },
        { json: "price_info", js: "price_info", typ: r("PriceInfoEnum") },
        { json: "original_cancellation_info", js: "original_cancellation_info", typ: r("OriginalCancellationInfo") },
        { json: "roomwise_coupon", js: "roomwise_coupon", typ: null },
    ], false),
    "VariantAdditionalInfo": o([
        { json: "tariff_notes", js: "tariff_notes", typ: "" },
        { json: "short_tariff_notes", js: "short_tariff_notes", typ: "" },
    ], false),
    "CancellationInfo": o([
        { json: "free_cancellation", js: "free_cancellation", typ: 0 },
        { json: "free_cancellation_info", js: "free_cancellation_info", typ: r("FreeCancellationInfo") },
        { json: "free_cancel_description", js: "free_cancel_description", typ: u(r("FreeCancelDescription"), null) },
        { json: "free_amendment_description", js: "free_amendment_description", typ: null },
        { json: "cancellation_rules", js: "cancellation_rules", typ: a(r("CancellationInfoCancellationRule")) },
    ], false),
    "CancellationInfoCancellationRule": o([
        { json: "date_info", js: "date_info", typ: r("DateInfo") },
        { json: "description", js: "description", typ: "" },
        { json: "cost", js: "cost", typ: null },
    ], false),
    "CancellationTimeline": o([
        { json: "cancellation_rules", js: "cancellation_rules", typ: a(r("CancellationTimelineCancellationRule")) },
        { json: "free_cancellation", js: "free_cancellation", typ: 0 },
        { json: "no_show", js: "no_show", typ: 0 },
        { json: "no_show_description", js: "no_show_description", typ: u(r("NoShowDescription"), null) },
        { json: "free_cancellation_description", js: "free_cancellation_description", typ: u(r("FreeCancellationDescription"), null) },
    ], false),
    "CancellationTimelineCancellationRule": o([
        { json: "currently_here", js: "currently_here", typ: true },
        { json: "title", js: "title", typ: r("Title") },
        { json: "sub_title", js: "sub_title", typ: r("FreeCancellationDescription") },
        { json: "type", js: "type", typ: 0 },
        { json: "amount", js: "amount", typ: 0 },
        { json: "currency", js: "currency", typ: r("Currency") },
        { json: "to_date", js: "to_date", typ: u(Date, r("FromDateEnum")) },
        { json: "from_date", js: "from_date", typ: u(Date, r("FromDateEnum")) },
    ], false),
    "DisplayProperty": o([
        { json: "name", js: "name", typ: r("DisplayPropertyName") },
        { json: "display_name", js: "display_name", typ: r("DisplayPropertyDisplayName") },
        { json: "icon_name", js: "icon_name", typ: r("IconName") },
        { json: "order", js: "order", typ: "" },
        { json: "value", js: "value", typ: r("ValueEnum") },
    ], false),
    "OriginalCancellationInfo": o([
        { json: "count", js: "count", typ: 0 },
        { json: "rule", js: "rule", typ: a(r("Rule")) },
    ], false),
    "Rule": o([
        { json: "runno", js: "runno", typ: 0 },
        { json: "to_date", js: "to_date", typ: u(undefined, Date) },
        { json: "to_date_details", js: "to_date_details", typ: u(undefined, r("ToDateDetails")) },
        { json: "amend_charge", js: "amend_charge", typ: u(undefined, r("Charge")) },
        { json: "cancel_charge", js: "cancel_charge", typ: u(undefined, r("Charge")) },
        { json: "charge", js: "charge", typ: u(undefined, r("Charge")) },
        { json: "from_date", js: "from_date", typ: u(undefined, Date) },
        { json: "from_date_details", js: "from_date_details", typ: u(undefined, r("FromDateDetails")) },
        { json: "amend_restricted", js: "amend_restricted", typ: u(undefined, true) },
        { json: "cancel_restricted", js: "cancel_restricted", typ: u(undefined, true) },
        { json: "no_show_policy", js: "no_show_policy", typ: u(undefined, true) },
    ], false),
    "Charge": o([
        { json: "value", js: "value", typ: 3.14 },
        { json: "formatted", js: "formatted", typ: r("Formatted") },
    ], false),
    "VariantProperties": o([
        { json: "passenger_names_required_for_booking", js: "passenger_names_required_for_booking", typ: 0 },
        { json: "allows_extra_meals", js: "allows_extra_meals", typ: true },
        { json: "allows_special_requests", js: "allows_special_requests", typ: true },
        { json: "allows_bedding_preference", js: "allows_bedding_preference", typ: true },
        { json: "min_stay", js: "min_stay", typ: "" },
        { json: "date_apply_min_stay", js: "date_apply_min_stay", typ: "" },
        { json: "on_request", js: "on_request", typ: 0 },
    ], false),
    "TotalPrice": o([
        { json: "total_price", js: "total_price", typ: 3.14 },
        { json: "discounted_price", js: "discounted_price", typ: 3.14 },
        { json: "total_price_rounded", js: "total_price_rounded", typ: 0 },
        { json: "discounted_price_rounded", js: "discounted_price_rounded", typ: 0 },
        { json: "currency", js: "currency", typ: r("Currency") },
        { json: "price_break_up", js: "price_break_up", typ: a(r("PriceBreakUp")) },
        { json: "previous_price", js: "previous_price", typ: null },
        { json: "previous_price_rounded", js: "previous_price_rounded", typ: null },
        { json: "price_changed", js: "price_changed", typ: null },
        { json: "offer_present", js: "offer_present", typ: true },
        { json: "promo", js: "promo", typ: r("Promo") },
        { json: "promo_list", js: "promo_list", typ: a(r("Promo")) },
        { json: "markup", js: "markup", typ: r("TotalPriceMarkup") },
        { json: "markup_share", js: "markup_share", typ: r("MarkupShare") },
    ], false),
    "TotalPriceMarkup": o([
        { json: "fixed_markup", js: "fixed_markup", typ: 3.14 },
        { json: "dynamic_markup", js: "dynamic_markup", typ: 3.14 },
    ], false),
    "PriceBreakUp": o([
        { json: "unravel_markup", js: "unravel_markup", typ: 3.14 },
        { json: "total_sale_price", js: "total_sale_price", typ: 3.14 },
        { json: "dotw_discounted_price", js: "dotw_discounted_price", typ: 3.14 },
        { json: "fixed_markup_price", js: "fixed_markup_price", typ: 3.14 },
        { json: "dynamic_markup_price", js: "dynamic_markup_price", typ: 3.14 },
        { json: "base_price", js: "base_price", typ: 3.14 },
        { json: "unravel_commission", js: "unravel_commission", typ: 3.14 },
        { json: "client_commission", js: "client_commission", typ: 0 },
        { json: "final_discounted_price", js: "final_discounted_price", typ: 3.14 },
    ], false),
    "Promo": o([
        { json: "discount", js: "discount", typ: u(3.14, null) },
        { json: "offer_type", js: "offer_type", typ: u(r("Type"), null) },
        { json: "offer_title", js: "offer_title", typ: u(r("OfferTitle"), null) },
        { json: "offer_description", js: "offer_description", typ: u(r("OfferDescription"), null) },
        { json: "offer_condition", js: "offer_condition", typ: null },
        { json: "offer_note", js: "offer_note", typ: null },
        { json: "offer_stay", js: "offer_stay", typ: u(0, null) },
        { json: "offer_pay", js: "offer_pay", typ: null },
        { json: "offer_upgrade_to_room_id", js: "offer_upgrade_to_room_id", typ: null },
        { json: "offer_upgrade_to_meal_id", js: "offer_upgrade_to_meal_id", typ: null },
        { json: "offer_discounted_nights", js: "offer_discounted_nights", typ: null },
        { json: "offer_total_price", js: "offer_total_price", typ: u(3.14, null) },
        { json: "offer_discounted_total_price", js: "offer_discounted_total_price", typ: u(3.14, null) },
    ], false),
    "OfferDescription": [
        "Avail this offer to get 28% off on your booking",
        "Price shown for this room includes the discount",
    ],
    "OfferTitle": [
        "25% off",
        "28% off",
    ],
    "BedType": [
        "DOUBLE",
    ],
    "SpecialName": [
        "GET AWAY DEAL 25% OFF",
    ],
    "Type": [
        "stayXGetDiscountPromotion",
        "Unravel Offer",
    ],
    "RoomImageDisplayName": [
        "Room images",
    ],
    "Key": [
        "room_images",
    ],
    "DateInfo": [
        "After Mon, 23 Sep 2024 06:00 AM: ",
        "After Mon, 23 Sep 2024 07:00 AM: ",
        "After Mon, 23 Sep 2024 12:00 PM: ",
        "After Mon, 23 Sep 2024 16:00 PM: ",
        "After Mon, 23 Sep 2024 18:00 PM: ",
        "After Mon, 23 Sep 2024 20:00 PM: ",
        "After Sun, 22 Sep 2024 20:00 PM: ",
        "After Thu, 19 Sep 2024 06:00 AM: ",
        "After Thu, 19 Sep 2024 20:00 PM: ",
        "After Tue, 24 Sep 2024 04:00 AM: ",
        "After Tue, 24 Sep 2024 07:00 AM: ",
        "After Tue, 24 Sep 2024 20:00 PM: ",
        "After Wed, 11 Sep 2024 00:00 AM: ",
        "After Wed, 25 Sep 2024 20:00 PM: ",
        "From Sun, 22 Sep 2024 12:00 PM to Mon, 23 Sep 2024 12:00 PM: ",
        "From Tue, 24 Sep 2024 11:00 AM to Tue, 24 Sep 2024 19:59 PM: ",
    ],
    "FreeCancelDescription": [
        "Free Cancellation \nFree Amendment",
    ],
    "FreeCancellationInfo": [
        "Before Mon, 23 Sep 2024 06:00 AM ",
        "Before Mon, 23 Sep 2024 07:00 AM ",
        "Before Mon, 23 Sep 2024 16:00 PM ",
        "Before Mon, 23 Sep 2024 18:00 PM ",
        "Before Mon, 23 Sep 2024 20:00 PM ",
        "Before Sun, 22 Sep 2024 12:00 PM ",
        "Before Sun, 22 Sep 2024 20:00 PM ",
        "Before Thu, 19 Sep 2024 06:00 AM ",
        "Before Thu, 19 Sep 2024 20:00 PM ",
        "Before Tue, 24 Sep 2024 04:00 AM ",
        "Before Tue, 24 Sep 2024 07:00 AM ",
        "Before Tue, 24 Sep 2024 10:59 AM ",
        "Cancellation Policy",
    ],
    "Currency": [
        "MYR",
    ],
    "FromDateEnum": [
        "null",
    ],
    "FreeCancellationDescription": [
        "After 11 September, 00:00AM",
        "After 19 September, 06:00AM",
        "After 19 September, 20:00PM",
        "After 22 September, 20:00PM",
        "After 23 September, 06:00AM",
        "After 23 September, 07:00AM",
        "After 23 September, 12:00PM",
        "After 23 September, 16:00PM",
        "After 23 September, 18:00PM",
        "After 23 September, 20:00PM",
        "After 24 September, 04:00AM",
        "After 24 September, 07:00AM",
        "After 24 September, 20:00PM",
        "22 September, 12:00PM - 23 September, 12:00PM",
        "24 September, 11:00AM - 19:59PM",
        "Till 19 September, 06:00AM",
        "Till 19 September, 20:00PM",
        "Till 22 September, 12:00PM",
        "Till 22 September, 20:00PM",
        "Till 23 September, 06:00AM",
        "Till 23 September, 07:00AM",
        "Till 23 September, 16:00PM",
        "Till 23 September, 18:00PM",
        "Till 23 September, 20:00PM",
        "Till 24 September, 04:00AM",
        "Till 24 September, 07:00AM",
        "Till 24 September, 10:59AM",
    ],
    "Title": [
        "Cancellation charge: ",
        "Cancellation not allowed",
        "Free cancellation",
    ],
    "NoShowDescription": [
        "Complete amount will be charged for no show",
    ],
    "DisplayPropertyDisplayName": [
        "Adult occupancy",
        "Bed type",
        "Family occupancy",
        "Meals included",
    ],
    "IconName": [
        "HOTEL/ROOM/adults",
        "HOTEL/ROOM/bedroom",
        "HOTEL/ROOM/breakfast",
        "HOTEL/ROOM/family",
    ],
    "DisplayPropertyName": [
        "adult_occupancy",
        "bed_type",
        "family_occupancy",
        "meals_included",
    ],
    "ValueEnum": [
        "Breakfast included in the price",
        "Breakfast + Lunch/Dinner",
        "Double bed",
        "Room only",
        "Upto 2 adults",
        "Upto 2 adults and 1 children",
        "Upto 3 adults with 1 extra bed(s)",
    ],
    "VariantName": [
        "Breakfast",
        "Half Board",
        "Room Only",
    ],
    "Formatted": [
        "0.00",
        "1,381.42",
        "1,577.37",
        "1,895.58",
        "1,897.92",
        "1,897.94",
        "1,978.98",
        "2,060.68",
        "2,060.69",
        "2,067.26",
        "2,078.76",
        "2,078.78",
        "2,123.84",
        "2,146.94",
        "2,148.75",
        "2,164.45",
        "2,164.46",
        "2,185.48",
        "2,186.87",
        "2,241.52",
        "2,241.53",
        "2,305.48",
        "2,316.99",
        "2,332.99",
        "2,334.85",
        "2,350.08",
        "2,372.93",
        "2,417.14",
        "2,420.78",
        "2,443.50",
        "2,459.83",
        "2,485.28",
        "2,502.39",
        "2,515.64",
        "2,557.11",
        "2,584.52",
        "2,653.02",
        "2,668.50",
        "2,673.73",
        "2,698.44",
        "2,716.96",
        "2,836.70",
        "2,900.55",
    ],
    "FromDateDetails": [
        "Mon, 23 Sep 2024 06:00:01",
        "Mon, 23 Sep 2024 07:00:01",
        "Mon, 23 Sep 2024 12:00:01",
        "Mon, 23 Sep 2024 16:00:01",
        "Mon, 23 Sep 2024 18:00:01",
        "Mon, 23 Sep 2024 20:00:01",
        "Sun, 22 Sep 2024 12:00:01",
        "Sun, 22 Sep 2024 20:00:01",
        "Thu, 19 Sep 2024 06:00:01",
        "Thu, 19 Sep 2024 20:00:01",
        "Tue, 24 Sep 2024 04:00:01",
        "Tue, 24 Sep 2024 07:00:01",
        "Tue, 24 Sep 2024 11:00:00",
        "Tue, 24 Sep 2024 20:00:00",
        "Wed, 11 Sep 2024 00:00:01",
        "Wed, 25 Sep 2024 20:00:00",
    ],
    "ToDateDetails": [
        "Mon, 23 Sep 2024 06:00:00",
        "Mon, 23 Sep 2024 07:00:00",
        "Mon, 23 Sep 2024 12:00:00",
        "Mon, 23 Sep 2024 16:00:00",
        "Mon, 23 Sep 2024 18:00:00",
        "Mon, 23 Sep 2024 20:00:00",
        "Sun, 22 Sep 2024 12:00:00",
        "Sun, 22 Sep 2024 20:00:00",
        "Thu, 19 Sep 2024 06:00:00",
        "Thu, 19 Sep 2024 20:00:00",
        "Tue, 24 Sep 2024 04:00:00",
        "Tue, 24 Sep 2024 07:00:00",
        "Tue, 24 Sep 2024 10:59:59",
        "Tue, 24 Sep 2024 19:59:59",
    ],
    "PriceInfoEnum": [
        "Price for 1 night",
    ],
};
