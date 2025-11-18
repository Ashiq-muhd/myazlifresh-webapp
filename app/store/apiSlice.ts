// app/store/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "https://api.aslifresh.com";

export const apiSlice = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined") {
        const apiKey =
          localStorage.getItem("apiKey") ||
          localStorage.getItem("api-key") ||
          null;
        const authToken =
          localStorage.getItem("authToken") ||
          localStorage.getItem("userToken") ||
          null;
        if (apiKey) headers.set("api-key", apiKey);
        if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // ======================================================
    // AUTH
    // ======================================================

    sendOtp: builder.mutation<any, { mobile_or_email: string }>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      transformResponse: (res: any) => res?.data ?? null,
    }),

    verifyOtp: builder.mutation<any, { otpKey: string; otp: string }>({
      query: (body) => ({
        url: "/user/verify_otp",
        method: "POST",
        body,
      }),
      transformResponse: (res: any) => {
        const key = res?.data?.["api-key"] ?? res?.data?.apiKey ?? null;
        return key ? { apiKey: key } : null;
      },
    }),

    // ======================================================
    // CATEGORIES
    // ======================================================

    getCategories: builder.query<any[], void>({
      query: () => "/user/catAndSub/get",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    // ======================================================
    // PRODUCTS
    // ======================================================

    getProductsByCategory: builder.query<any[], { categoryId: number; page?: number; limit?: number }>({
      query: ({ categoryId, page = 1, limit = 48 }) =>
        `/user/product/buy/cat/list/${categoryId}?page=${page}&limit=${limit}`,
      transformResponse: (res: any) => {
        const candidates = [
          res?.data?.data?.products,
          res?.data?.products,
          res?.data?.data,
          res?.data,
          res?.products,
          res,
        ];
        for (const c of candidates) {
          if (Array.isArray(c)) return c;
        }
        return [];
      },
    }),

    getProductById: builder.query<any, string>({
      query: (id) =>
        `/user/product/get/${id}?normal_visible=true&whole_fish_visible=true`,
      transformResponse: (res: any) => res?.data ?? null,
    }),

    getProducts: builder.query<any[], void>({
      query: () => "/user/product/get",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    getSpecialOffers: builder.query<any[], void>({
      query: () => "/user/product/offers",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    getReadyToEat: builder.query<any[], void>({
      query: () => "/user/offer/ready_to_eat/list",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    getRegionalSpecials: builder.query<any[], void>({
      query: () => "/user/specialPack/get",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    getHeroBanners: builder.query<any[], void>({
      query: () => "/user/home/banner/get",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    // ======================================================
    // WALLET
    // ======================================================

    getWalletTransactions: builder.query<any, void>({
      query: () => "/user/wallet/list",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    // ======================================================
    // CART
    // ======================================================

    addToCart: builder.mutation<any, { productId: number; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "/user/cart/add",
        method: "POST",
        body: { productId, quantity },
      }),
    }),

    removeFromCart: builder.mutation<any, { productId: number; quantity?: number }>({
      query: ({ productId, quantity = 1 }) => ({
        url: "/user/cart/remove",
        method: "POST",
        body: { productId, quantity },
      }),
    }),

    getCartList: builder.query<any, void>({
      query: () => ({ url: "/user/cart/list", method: "GET" }),
      transformResponse: (res: any) => res?.data ?? res ?? [],
    }),

    // ======================================================
    // SEARCH
    // ======================================================

    searchProducts: builder.mutation<any[], { keyword: string; page?: number; limit?: number }>({
      query: ({ keyword, page, limit }) => ({
        url: "/user/product/search",
        method: "POST",
        body: { keyword, page, limit },
      }),
      transformResponse: (res: any) => res?.data ?? [],
    }),

    // ======================================================
    // BANNERS
    // ======================================================

    getCategorySliderBanners: builder.query<any[], { catId: number | string }>({
      query: ({ catId }) => `/user/banner/list/slider/${catId}/true`,
      transformResponse: (res: any) => res?.data ?? [],
    }),

    getBannersByType: builder.query<any[], { bannerType: "normal" | "slider" }>({
      query: ({ bannerType }) =>
        `/user/banner/list/${bannerType}/All/true`,
      transformResponse: (res: any) => {
        const candidates = [
          res?.data,
          res?.data?.banners,
          res?.banners,
          res?.items,
          res?.data?.items,
          res,
        ];
        for (const c of candidates) {
          if (Array.isArray(c)) return c;
        }
        return [];
      },
    }),

    // ======================================================
    // WISHLIST
    // ======================================================

    getWishlist: builder.query<any[], void>({
      query: () => "/user/wish/list",
      transformResponse: (res: any) => res?.data ?? [],
    }),

    toggleWishlistItem: builder.mutation<any, { productId: number | string }>({
      query: ({ productId }) => ({
        url: `/user/wish/list/add_or_remove/${productId}`,
        method: "GET",
      }),
    }),

    // ======================================================
    // ORDERS
    // ======================================================

    getOrders: builder.query<any[], { delivered?: boolean | string }>({
      query: ({ delivered }: { delivered?: boolean | string } = {}) => {
        const qs = delivered !== undefined ? `?delivered=${String(delivered)}` : "";
        return `/user/orders${qs}`;
      },
      transformResponse: (res: any) => res?.data ?? [],
    }),

    // ======================================================
    // ADDRESSES
    // ======================================================

    getAddressList: builder.query<any[], any>({
      query: (_args) => ({ url: "/user/address/list", method: "GET" }),
      transformResponse: (res: any) => (Array.isArray(res?.data) ? res.data : []),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetSpecialOffersQuery,
  useGetReadyToEatQuery,
  useGetRegionalSpecialsQuery,
  useGetHeroBannersQuery,
  useGetWalletTransactionsQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useSearchProductsMutation,
  useGetCategorySliderBannersQuery,
  useGetBannersByTypeQuery,
  useGetCartListQuery,
  useGetWishlistQuery,
  useToggleWishlistItemMutation,
  useGetOrdersQuery,
  useGetAddressListQuery,
} = apiSlice;