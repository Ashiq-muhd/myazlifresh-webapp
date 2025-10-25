// app/store/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.aslifresh.com' }), 
  endpoints: (builder) => ({
    // 🟢 Get all categories
    getCategories: builder.query<any[], void>({
      query: () => '/user/catAndSub/get',
      transformResponse: (response: { data: any[] }) => response.data,
    }),

    // 🟢 Get products by category (Main for ProductsPage)
    getProductsByCategory: builder.query<
      any[],
      { categoryId: number; page?: number; limit?: number }
    >({
      query: ({ categoryId, page = 1, limit = 48 }) =>
        `/user/product/buy/cat/list/${categoryId}?page=${page}&limit=${limit}`,
      transformResponse: (response: any) =>
        response.data?.data ?? response.data ?? [],
    }),

    // 🟢 Get single product by ID
    getProductById: builder.query<any, string>({
      query: (id) =>
        `/user/product/get/${id}?normal_visible=true&whole_fish_visible=`,
      transformResponse: (response: any) => response.data,
    }),

    // 🟢 Get all products (generic fallback)
    getProducts: builder.query<any[], void>({
      query: () => '/user/product/get',
      transformResponse: (response: { data: any[] }) => response.data,
    }),

    // 🟢 Special Offers
    getSpecialOffers: builder.query<any[], void>({
      query: () => '/user/product/offers',
      transformResponse: (response: any) => response.data,
    }),

    // 🟢 Ready to Eat
    getReadyToEat: builder.query<any[], void>({
      query: () => '/user/offer/ready_to_eat/list',
      transformResponse: (response: any) => response.data,
    }),

    // 🟢 Explore Our Special Picks (Regional Specials)
    getRegionalSpecials: builder.query<any[], void>({
      query: () => '/user/specialPack/get',
      transformResponse: (response: { data: any[] }) => response.data,
    }),

    // 🟢 Hero Banners
    getHeroBanners: builder.query<any[], void>({
      query: () => '/user/home/banner/get',
      transformResponse: (response: { data: any[] }) => response.data,
    }),

    // 🟢 Wallet transactions
    getWalletTransactions: builder.query<any, void>({
      query: () => '/user/wallet/list',
      transformResponse: (response: { data: any }) => response.data,
    }),

    // 🟢 Add to Cart
    addToCart: builder.mutation<any, { productId: number; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: '/user/cart/add',
        method: 'POST',
        body: { productId, quantity },
      }),
    }),
  }),
});

// ✅ Auto-generated hooks
export const {
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
} = apiSlice;




// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Update baseUrl with your API base
// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api-domain.com/' }),
//   endpoints: (builder) => ({
//     // GET all products
//     getProducts: builder.query<any[], void>({
//       query: () => 'products',
//     }),

//     // GET single product by ID
//     getProductById: builder.query<any, string>({
//       query: (id) => `products/${id}`,
//     }),

//     // Example: Get completed orders
//     getCompletedOrders: builder.query<any[], void>({
//       query: () => 'orders?status=completed',
//     }),

//     // Example: Get addresses
//     getAddresses: builder.query<any[], void>({
//       query: () => 'addresses',
//     }),
//   }),
// });

// // ✅ Auto-generated hooks
// export const {
//   useGetProductsQuery,
//   useGetProductByIdQuery,
//   useGetCompletedOrdersQuery,
//   useGetAddressesQuery,
// } = apiSlice;
