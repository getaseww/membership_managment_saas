export const MAIN_API_URL = import.meta.env.PROD ? "https://newcom.efoyplus.com/api/" : "http://localhost:8000/api/";


export const routes = {
    HOME: "/",
    LOGIN: "/auth/login",
    DASHBOARD: "/",
    MEMBER: "/dashboard/member",
    PAYMENT: "/dashboard/payment",

    MEMEBERSHIP_PLAN: "/dashboard/membership-plan",
    SUBSCRIPTION: "/dashboard/subscription",
    ROLE: "/dashboard/role",
    // inventory
    INVENTORY_EQUIPMENT: "/dashboard/inventory/equipment"

    // sms


}

export const BUTTON_BACKGROUND = "bg-[#1F677D]";
