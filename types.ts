export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  isHot?: boolean;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}
