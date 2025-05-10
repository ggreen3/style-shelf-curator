
import { ClothingItemProps } from "@/components/clothing/ClothingItem";
import { v4 as uuidv4 } from 'uuid';

// Men's clothing demo images
const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", // Men's casual outfit
  "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", // Men's jeans
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80", // Men's shirt
  "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1949&q=80", // Men's suit
  "https://images.unsplash.com/photo-1516826957135-700dedea698c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", // Men's shoes
  "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=738&q=80", // Men's jacket
  "https://images.unsplash.com/photo-1626497764746-6dc36546b388?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80", // Men's hoodie
  "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1926&q=80", // Men's casual shoes
  "https://images.unsplash.com/photo-1620331311520-246422fd82f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80", // Men's watch
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80", // Men's sunglasses
  "https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", // Men's hat
  "https://images.unsplash.com/photo-1550246140-5119ae4790b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", // Men's sneakers
];

// Men's outfit inspiration images
const INSPIRATION_IMAGES = [
  "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", // Men's street style
  "https://images.unsplash.com/photo-1614252369475-531eba835eb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=702&q=80", // Men's formal outfit
  "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80", // Men's casual style
  "https://images.unsplash.com/photo-1571908598047-29b5c8579aca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", // Men's business casual
  "https://images.unsplash.com/photo-1577909659949-792204ced365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", // Men's workout outfit
  "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80", // Men's casual outfit
  "https://images.unsplash.com/photo-1612462766564-839041a81af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80", // Men's street wear
  "https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", // Men's formal wear
  "https://images.unsplash.com/photo-1550418290-a8d86ad674a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80", // Men's smart casual
  "https://images.unsplash.com/photo-1583855282680-6dbdc7a26b1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80", // Men's trendy outfit
];

const CATEGORIES = ["Tops", "Bottoms", "Outerwear", "Footwear", "Accessories", "Formal"];

const DESCRIPTIONS = [
  "White oxford shirt",
  "Black slim jeans",
  "Navy blue blazer",
  "Grey hoodie",
  "Brown leather jacket",
  "Khaki chinos",
  "White sneakers",
  "Black dress shoes",
  "Denim jacket",
  "Black leather belt",
  "Navy blue suit",
  "Casual watch"
];

const TAGS = [
  "casual", "formal", "summer", "winter", "spring", "fall",
  "work", "weekend", "evening", "party", "sports", "workout",
  "streetwear", "business", "vintage", "modern"
];

export function generateDemoItems(): ClothingItemProps[] {
  return DEMO_IMAGES.map((imageUrl, index) => {
    const category = CATEGORIES[index % CATEGORIES.length];
    const description = DESCRIPTIONS[index % DESCRIPTIONS.length];
    const randomTags = Array.from({ length: 2 + Math.floor(Math.random() * 3) }, () => 
      TAGS[Math.floor(Math.random() * TAGS.length)]
    );
    
    // Add realistic men's clothing colors
    const colors = ["#000000", "#0A3161", "#333333", "#5D8AA8", "#7B3F00", "#D3D3D3", "#FFFFFF", "#1560BD", "#6F4E37"];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      id: uuidv4(),
      imageUrl,
      category,
      description,
      isFavorite: Math.random() > 0.7,
      tags: [...new Set(randomTags)], // Remove duplicates
      color,
      brand: ["Nike", "Adidas", "Levi's", "H&M", "Zara", "Under Armour", "Calvin Klein", "Ralph Lauren"][Math.floor(Math.random() * 8)],
      season: ["Spring", "Summer", "Fall", "Winter", "All Seasons"][Math.floor(Math.random() * 5)]
    };
  });
}

export function generateInspirationItems(): ClothingItemProps[] {
  return INSPIRATION_IMAGES.map((imageUrl) => {
    const category = "Inspiration";
    
    return {
      id: uuidv4(),
      imageUrl,
      category,
      isFavorite: Math.random() > 0.7,
      tags: ["outfit", "inspiration", "men's style", "fashion"],
    };
  });
}
