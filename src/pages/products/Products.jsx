import React from 'react'
import { DataTable } from "../../components/data-table/DataTable"
import { formatCurrency, getStatusBadge, formatDate } from "../../utils/formatters"
import { TableActions } from "../../components/table/TableActions"

export const Products = () => {

  const handleEdit = (row) => {
    console.log(row)
  }

  const handleDelete = (row) => {
    console.log(row.id)
  }

  const handleView = (row) => {
    console.log(row)
  }

  const data = [
  {
    "id": "1",
    "name": "Wireless Noise-Cancelling Headphones",
    "price": 299.99,
    "cost": 180.00,
    "stock": 45,
    "category": "Electronics",
    "brand": "SoundMaster",
    "sku": "SM-HP-001",
    "description": "Premium wireless headphones with active noise cancellation",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.5,
    "reviews": 128,
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00Z"
  },
  {
    "id": "2",
    "name": "Cotton Casual T-Shirt",
    "price": 29.99,
    "cost": 12.50,
    "stock": 200,
    "category": "Apparel",
    "brand": "FashionBasic",
    "sku": "FB-TS-042",
    "description": "Comfortable 100% cotton t-shirt, available in multiple colors",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.2,
    "reviews": 89,
    "isActive": true,
    "createdAt": "2024-02-03T14:20:00Z"
  },
  {
    "id": "3",
    "name": "Stainless Steel Water Bottle",
    "price": 24.99,
    "cost": 10.00,
    "stock": 150,
    "category": "Home & Kitchen",
    "brand": "EcoHydro",
    "sku": "EH-BT-123",
    "description": "Insulated stainless steel water bottle, keeps drinks cold for 24 hours",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.7,
    "reviews": 312,
    "isActive": true,
    "createdAt": "2024-03-10T09:15:00Z"
  },
  {
    "id": "4",
    "name": "Yoga Mat with Non-Slip Surface",
    "price": 39.99,
    "cost": 18.00,
    "stock": 80,
    "category": "Sports & Outdoors",
    "brand": "FlexiFit",
    "sku": "FF-YM-007",
    "description": "Eco-friendly yoga mat with extra grip and cushioning",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.4,
    "reviews": 204,
    "isActive": true,
    "createdAt": "2024-04-22T11:45:00Z"
  },
  {
    "id": "5",
    "name": "Smart LED TV 55 Inch",
    "price": 549.99,
    "cost": 400.00,
    "stock": 12,
    "category": "Electronics",
    "brand": "VisionPlus",
    "sku": "VP-TV-055",
    "description": "4K Ultra HD Smart TV with HDR and built-in streaming apps",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.6,
    "reviews": 67,
    "isActive": true,
    "createdAt": "2024-05-05T16:20:00Z"
  },
  {
    "id": "6",
    "name": "Men's Running Shoes",
    "price": 89.99,
    "cost": 45.00,
    "stock": 95,
    "category": "Footwear",
    "brand": "SpeedStep",
    "sku": "SS-RS-210",
    "description": "Lightweight running shoes with breathable mesh and cushioned sole",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.3,
    "reviews": 156,
    "isActive": true,
    "createdAt": "2024-06-18T08:30:00Z"
  },
  {
    "id": "7",
    "name": "Gourmet Coffee Beans",
    "price": 19.99,
    "cost": 8.50,
    "stock": 300,
    "category": "Food & Beverage",
    "brand": "RoastMasters",
    "sku": "RM-CB-789",
    "description": "Medium roast whole bean coffee, rich and aromatic",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.8,
    "reviews": 420,
    "isActive": true,
    "createdAt": "2024-07-09T12:10:00Z"
  },
  {
    "id": "8",
    "name": "Leather Wallet",
    "price": 49.99,
    "cost": 20.00,
    "stock": 60,
    "category": "Accessories",
    "brand": "LuxeStyle",
    "sku": "LS-WL-034",
    "description": "Genuine leather wallet with multiple card slots and RFID blocking",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.1,
    "reviews": 78,
    "isActive": true,
    "createdAt": "2024-08-14T13:25:00Z"
  },
  {
    "id": "9",
    "name": "Bluetooth Speaker",
    "price": 79.99,
    "cost": 40.00,
    "stock": 110,
    "category": "Electronics",
    "brand": "AudioWave",
    "sku": "AW-BS-456",
    "description": "Portable waterproof speaker with 20-hour battery life",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.5,
    "reviews": 289,
    "isActive": true,
    "createdAt": "2024-09-02T17:40:00Z"
  },
  {
    "id": "10",
    "name": "Desk Lamp with USB Port",
    "price": 34.99,
    "cost": 15.00,
    "stock": 75,
    "category": "Home & Kitchen",
    "brand": "BrightLife",
    "sku": "BL-DL-567",
    "description": "Adjustable LED desk lamp with built-in USB charging port",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.2,
    "reviews": 103,
    "isActive": true,
    "createdAt": "2024-10-11T10:05:00Z"
  },
  {
    "id": "11",
    "name": "Women's Denim Jacket",
    "price": 69.99,
    "cost": 30.00,
    "stock": 55,
    "category": "Apparel",
    "brand": "UrbanStyle",
    "sku": "US-DJ-890",
    "description": "Classic denim jacket with button front and chest pockets",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.4,
    "reviews": 132,
    "isActive": true,
    "createdAt": "2024-11-23T15:15:00Z"
  },
  {
    "id": "12",
    "name": "Stainless Steel Cookware Set",
    "price": 199.99,
    "cost": 120.00,
    "stock": 30,
    "category": "Home & Kitchen",
    "brand": "ChefElite",
    "sku": "CE-CS-123",
    "description": "10-piece stainless steel cookware set with lids",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.7,
    "reviews": 215,
    "isActive": true,
    "createdAt": "2024-12-05T09:50:00Z"
  },
  {
    "id": "13",
    "name": "Fitness Tracker",
    "price": 59.99,
    "cost": 30.00,
    "stock": 140,
    "category": "Electronics",
    "brand": "HealthTech",
    "sku": "HT-FT-678",
    "description": "Water-resistant fitness tracker with heart rate monitor and step counter",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.3,
    "reviews": 347,
    "isActive": true,
    "createdAt": "2025-01-17T11:20:00Z"
  },
  {
    "id": "14",
    "name": "Backpack for Laptop",
    "price": 49.99,
    "cost": 22.00,
    "stock": 85,
    "category": "Accessories",
    "brand": "TravelMate",
    "sku": "TM-BP-901",
    "description": "Durable backpack with padded laptop compartment and USB charging port",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.6,
    "reviews": 178,
    "isActive": true,
    "createdAt": "2025-02-08T14:30:00Z"
  },
  {
    "id": "15",
    "name": "Electric Kettle",
    "price": 29.99,
    "cost": 12.00,
    "stock": 210,
    "category": "Home & Kitchen",
    "brand": "QuickBoil",
    "sku": "QB-EK-345",
    "description": "Stainless steel electric kettle with auto shut-off and boil-dry protection",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.5,
    "reviews": 98,
    "isActive": true,
    "createdAt": "2025-03-22T08:45:00Z"
  },
  {
    "id": "16",
    "name": "Gaming Mouse",
    "price": 39.99,
    "cost": 18.00,
    "stock": 120,
    "category": "Electronics",
    "brand": "GamePro",
    "sku": "GP-GM-567",
    "description": "High-precision gaming mouse with customizable RGB lighting",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.4,
    "reviews": 256,
    "isActive": true,
    "createdAt": "2025-04-14T16:10:00Z"
  },
  {
    "id": "17",
    "name": "Scented Candles Set",
    "price": 24.99,
    "cost": 10.00,
    "stock": 180,
    "category": "Home & Living",
    "brand": "AromaGlow",
    "sku": "AG-SC-789",
    "description": "Set of 3 scented soy candles in lavender, vanilla, and sandalwood",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.2,
    "reviews": 65,
    "isActive": true,
    "createdAt": "2025-05-19T12:55:00Z"
  },
  {
    "id": "18",
    "name": "Wireless Charger Pad",
    "price": 19.99,
    "cost": 8.00,
    "stock": 250,
    "category": "Electronics",
    "brand": "ChargeFast",
    "sku": "CF-WC-234",
    "description": "Fast wireless charging pad compatible with Qi-enabled devices",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.1,
    "reviews": 142,
    "isActive": true,
    "createdAt": "2025-06-27T09:30:00Z"
  },
  {
    "id": "19",
    "name": "Hiking Boots",
    "price": 119.99,
    "cost": 60.00,
    "stock": 40,
    "category": "Sports & Outdoors",
    "brand": "TrailBlazer",
    "sku": "TB-HB-456",
    "description": "Waterproof hiking boots with high traction and ankle support",
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcebsAtcCK22PuUXQM_LuA8Ge4CZcBX9pUXg&s"],
    "rating": 4.7,
    "reviews": 189,
    "isActive": true,
    "createdAt": "2025-07-11T15:40:00Z"
  },
  {
    "id": "20",
    "name": "Stainless Steel Watch",
    "price": 149.99,
    "cost": 80.00,
    "stock": 35,
    "category": "Accessories",
    "brand": "TimeCraft",
    "sku": "TC-SW-678",
    "description": "Elegant stainless steel analog watch with date display",
    "images": ["https://cdn.thewirecutter.com/wp-content/media/2025/04/BEST-TABLETS-2048px-3x2-1.jpg?auto=webp&quality=75&crop=4:3,smart&width=1024"],
    "rating": 4.5,
    "reviews": 76,
    "isActive": true,
    "createdAt": "2025-08-03T10:20:00Z"
  }
];

   const columns = [
    {
      key: 'images',
      label: 'Image',
      render: (row) => {
        const imageUrl = row.images?.[0]
        return (
          <img
            src={imageUrl}
            alt={row.name}
            className="w-10 h-10 rounded object-cover border border-cl"
            onError={(e) => (e.target.src = 'hhttps://placehold.co/40x40')}
          />
        );
      },
    },
    { key: 'name', label: 'Product Name' },
    { key: 'sku', label: 'SKU' },
    {
      key: 'price',
      label: 'Price',
      render: (row) => formatCurrency(row.price),
    },
    {
      key: 'cost',
      label: 'Cost',
      render: (row) => formatCurrency(row.cost),
    },
    { key: 'stock', label: 'Stock' },
    { key: 'category', label: 'Category' },
    { key: 'brand', label: 'Brand' },
    {
      key: 'rating',
      label: 'Rating',
      render: (row) => (
        <div className="flex items-center gap-1">
          <span>{row.rating}</span>
          <span className="text-yellow-500">★</span>
          <span className="text-xs text-cl-muted">({row.reviews})</span>
        </div>
      ),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => (
        <span className={row.isActive ? getStatusBadge('active') : getStatusBadge('inactive')}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Created',
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <TableActions
          row={row}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ),
    },
  ];

  return (
    <div className="bg-cl-primary w-full min-h-screen rounded-lg p-2 space-y-4">
      <h1 className="text-2xl">Products</h1>
      <DataTable data={data} columns={columns} />
    </div>
  )
}
