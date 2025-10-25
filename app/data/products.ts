import { Product } from '../types';

const baseProducts: Product[] = [
  // Fish & Seafood
  {
    id: '1',
    name: 'Fresh Water Tiger Prawns',
    category: 'seafood',
    price: 549,
    originalPrice: 600,
    weight: '500gm',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh water tiger prawns, perfect for curries and grills. Sourced from clean water bodies.',
    inStock: true,
    discount: 9,
    variants: [
      {
        id: '1a',
        name: 'Peeled and Deveined',
        price: 1098,
        originalPrice: 1098,
        weight: '520-520gm',
        description: 'Uncleaned Weight: 520 – 520gm',
        image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '1b',
        name: 'Peeled and Deveined',
        price: 549,
        originalPrice: 549,
        weight: '240-260gm',
        description: 'Uncleaned Weight: 240 – 260gm',
        image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '1c',
        name: 'Uncleaned',
        price: 549,
        originalPrice: 549,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '2',
    name: 'Indian Prawns',
    category: 'seafood',
    price: 260,
    originalPrice: 549,
    weight: '500gm',
    image: 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh Indian prawns, ideal for traditional recipes and coastal cuisine.',
    inStock: true,
    discount: 53,
    variants: [
      {
        id: '2a',
        name: 'Curry Cut',
        price: 280,
        originalPrice: 320,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '2b',
        name: 'Whole Cleaned',
        price: 260,
        originalPrice: 549,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/566345/pexels-photo-566345.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '3',
    name: 'Catla Fish',
    category: 'fish',
    price: 260,
    originalPrice: 340,
    weight: '1kg',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh water Catla fish, rich in protein and omega-3 fatty acids.',
    inStock: false,
    discount: 24,
    variants: [
      {
        id: '3a',
        name: 'Curry Cut',
        price: 260,
        originalPrice: 340,
        weight: '1kg',
        description: 'Uncleaned Weight: 1kg',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '3b',
        name: 'Fillet',
        price: 320,
        originalPrice: 380,
        weight: '800gm',
        description: 'Uncleaned Weight: 800gm',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '4',
    name: 'Rohu Fish',
    category: 'fish',
    price: 199,
    originalPrice: 220,
    weight: '1kg',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh Rohu fish, perfect for Bengali and South Indian preparations.',
    inStock: true,
    discount: 10,
    variants: [
      {
        id: '4a',
        name: 'Curry Cut',
        price: 199,
        originalPrice: 220,
        weight: '1kg',
        description: 'Uncleaned Weight: 1kg',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '4b',
        name: 'Round Cut',
        price: 210,
        originalPrice: 230,
        weight: '1kg',
        description: 'Uncleaned Weight: 1kg',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '4c',
        name: 'Fillet',
        price: 250,
        originalPrice: 280,
        weight: '800gm',
        description: 'Uncleaned Weight: 800gm',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '5',
    name: 'Tengra Fish',
    category: 'fish',
    price: 299,
    originalPrice: 350,
    weight: '500gm',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Small fresh water fish, great for frying and curry preparations.',
    inStock: true,
    discount: 25,
    variants: [
      {
        id: '5a',
        name: 'Whole Cleaned',
        price: 299,
        originalPrice: 350,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  
  // Chicken
  {
    id: '6',
    name: 'Fresh Chicken Breast',
    category: 'chicken',
    price: 320,
    originalPrice: 380,
    weight: '500gm',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Boneless chicken breast, perfect for grilling and healthy meals.',
    inStock: true,
    discount: 16,
    variants: [
      {
        id: '6a',
        name: 'Curry Cut',
        price: 320,
        originalPrice: 380,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '6b',
        name: 'Skinless',
        price: 340,
        originalPrice: 400,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '6c',
        name: 'Fillet',
        price: 360,
        originalPrice: 420,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '7',
    name: 'Chicken Drumsticks',
    category: 'chicken',
    price: 280,
    originalPrice: 320,
    weight: '1kg',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh chicken drumsticks, ideal for barbecue and curry preparations.',
    inStock: true,
    discount: 13,
    variants: [
      {
        id: '7a',
        name: 'Whole',
        price: 280,
        originalPrice: 320,
        weight: '1kg',
        description: 'Uncleaned Weight: 1kg',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '7b',
        name: 'Skinless',
        price: 300,
        originalPrice: 340,
        weight: '1kg',
        description: 'Uncleaned Weight: 1kg',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '8',
    name: 'Whole Chicken',
    category: 'chicken',
    price: 450,
    originalPrice: 500,
    weight: '1.2kg',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh whole chicken, cleaned and ready for cooking.',
    inStock: true,
    discount: 10,
    variants: [
      {
        id: '8a',
        name: 'Whole Cleaned',
        price: 450,
        originalPrice: 500,
        weight: '1.2kg',
        description: 'Uncleaned Weight: 1.2kg',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '8b',
        name: 'Curry Cut',
        price: 470,
        originalPrice: 520,
        weight: '1.2kg',
        description: 'Uncleaned Weight: 1.2kg',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },

  // Mutton
  {
    id: '9',
    name: 'Mutton Curry Cut',
    category: 'meat',
    price: 650,
    originalPrice: 720,
    weight: '500gm',
    image: 'https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh mutton cut into curry pieces, perfect for traditional preparations.',
    inStock: true,
    discount: 10,
    variants: [
      {
        id: '9a',
        name: 'Curry Cut',
        price: 650,
        originalPrice: 720,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '9b',
        name: 'Round Cut',
        price: 670,
        originalPrice: 740,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '10',
    name: 'Goat Liver',
    category: 'meat',
    price: 380,
    originalPrice: 420,
    weight: '500gm',
    image: 'https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh goat liver, rich in iron and vitamins.',
    inStock: true,
    discount: 10,
    variants: [
      {
        id: '10a',
        name: 'Whole',
        price: 380,
        originalPrice: 420,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '10b',
        name: 'Sliced',
        price: 390,
        originalPrice: 430,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/3688/food-dinner-lunch-unhealthy.jpg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },

  // Eggs
  {
    id: '11',
    name: 'Farm Fresh Eggs',
    category: 'eggs',
    price: 120,
    weight: '12 pieces',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Farm fresh eggs from free-range chickens.',
    inStock: true,
    variants: [
      {
        id: '11a',
        name: 'Regular Pack',
        price: 120,
        weight: '12 pieces',
        description: 'Uncleaned Weight: 12 pieces',
        image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '12',
    name: 'Country Eggs',
    category: 'eggs',
    price: 180,
    weight: '12 pieces',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Organic country eggs with rich taste and nutrition.',
    inStock: true,
    variants: [
      {
        id: '12a',
        name: 'Organic Pack',
        price: 180,
        weight: '12 pieces',
        description: 'Uncleaned Weight: 12 pieces',
        image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  }
];

// Add more products with special offers
const additionalProducts: Product[] = [
  {
    id: '13',
    name: 'Fresh Salmon Fillet',
    category: 'fish',
    price: 899,
    originalPrice: 1200,
    weight: '500gm',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium Atlantic salmon fillet, rich in omega-3 fatty acids.',
    inStock: true,
    discount: 25,
    variants: [
      {
        id: '13a',
        name: 'Boneless Fillet',
        price: 899,
        originalPrice: 1200,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '14',
    name: 'Pomfret Fish',
    category: 'fish',
    price: 650,
    originalPrice: 800,
    weight: '1kg',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh pomfret fish, perfect for frying and grilling.',
    inStock: true,
    discount: 19,
    variants: [
      {
        id: '14a',
        name: 'Whole Cleaned',
        price: 650,
        originalPrice: 800,
        weight: '1kg',
        description: 'Uncleaned Weight: 1kg',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '14b',
        name: 'Curry Cut',
        price: 670,
        originalPrice: 820,
        weight: '1kg',
        description: 'Uncleaned Weight: 1kg',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '15',
    name: 'Chicken Wings',
    category: 'chicken',
    price: 240,
    originalPrice: 300,
    weight: '500gm',
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh chicken wings, perfect for barbecue and appetizers.',
    inStock: true,
    discount: 20,
    variants: [
      {
        id: '15a',
        name: 'Whole Wings',
        price: 240,
        originalPrice: 300,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        id: '15b',
        name: 'Skinless Wings',
        price: 260,
        originalPrice: 320,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
  {
    id: '16',
    name: 'Crab Meat',
    category: 'seafood',
    price: 750,
    originalPrice: 950,
    weight: '500gm',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh crab meat, extracted from premium quality crabs.',
    inStock: true,
    discount: 21,
    variants: [
      {
        id: '16a',
        name: 'Extracted Meat',
        price: 750,
        originalPrice: 950,
        weight: '500gm',
        description: 'Uncleaned Weight: 500gm',
        image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ]
  },
 {
  id: 'gravy01',
  name: 'Butter Chicken Gravy',
  image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
  weight: '250gm',
  price: '149',
  category: 'instant',
  inStock: true
},
{
  id: 'gravy02',
  name: 'Paneer Tikka Masala',
  image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=800',
  weight: '250gm',
  price: '139',
  category: 'instant',
  inStock: true
}

// Add more gravy packs here...

];

export const products: Product[] = [...baseProducts, ...additionalProducts];