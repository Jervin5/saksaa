import { User, Order, OrderItem, Product } from '../types';
import { products as mockProducts } from '../data';

const getMockUser = (): User => {
  const stored = localStorage.getItem('saksaas_user');
  if (stored) return JSON.parse(stored);
  return {
    id: 1,
    fullName: 'Admin User',
    email: 'admin@saksaas.com',
    role: 'Admin',
    phone: '+91 98765 43210',
    addressLine1: '123 Artisan Lane, Apartment 4B',
    city: 'Bangalore',
    pincode: '560001'
  };
};

const getMockOrders = (): Order[] => {
  const stored = localStorage.getItem('saksaas_orders');
  if (stored) return JSON.parse(stored);
  return [
    {
      OrderID: 8291,
      OrderDate: new Date().toISOString(),
      TotalAmount: 2450,
      Status: 'Delivered',
      PaymentMethod: 'Credit Card',
      ShippingAddress: 'John Doe, 123 Artisan Lane, Bangalore'
    }
  ];
};

export const apiService = {
  // Auth
  async login(credentials: any) {
    // Mock login
    const user = getMockUser();
    localStorage.setItem('saksaas_token', 'mock_token');
    localStorage.setItem('saksaas_user', JSON.stringify(user));
    return { token: 'mock_token', user };
  },

  async signup(userData: any) {
    // Mock signup
    const user = { id: Date.now(), ...userData };
    localStorage.setItem('saksaas_user', JSON.stringify(user));
    return { message: 'Success' };
  },

  logout() {
    localStorage.removeItem('saksaas_token');
    localStorage.removeItem('saksaas_user');
  },

  // Profile
  async getProfile(): Promise<User> {
    return getMockUser();
  },

  async updateProfile(userData: Partial<User>) {
    const current = getMockUser();
    const updated = { ...current, ...userData };
    localStorage.setItem('saksaas_user', JSON.stringify(updated));
    return updated;
  },

  // Products
  async getProducts(): Promise<Product[]> {
    return mockProducts;
  },

  async updateProductPrice(id: string, newPrice: number) {
    const product = mockProducts.find(p => p.id === id);
    if (product) {
      product.price = newPrice;
    }
    return product;
  },

  async getProductById(id: string): Promise<Product> {
    const p = mockProducts.find(item => item.id === id);
    if (!p) throw new Error('Product not found');
    return p;
  },

  // Orders
  async createOrder(orderData: any) {
    const orders = getMockOrders();
    const newOrder = {
      OrderID: Math.floor(Math.random() * 10000),
      OrderDate: new Date().toISOString(),
      TotalAmount: orderData.totalAmount,
      Status: 'Processing',
      PaymentMethod: orderData.paymentMethod,
      ShippingAddress: orderData.shippingAddress,
      items: orderData.items
    };
    orders.push(newOrder);
    localStorage.setItem('saksaas_orders', JSON.stringify(orders));
    return newOrder;
  },

  async getOrders(): Promise<Order[]> {
    return getMockOrders();
  },

  async getOrderById(id: string): Promise<Order & { items: OrderItem[] }> {
    const orders = getMockOrders();
    const order = orders.find(o => o.OrderID.toString() === id);
    if (!order) throw new Error('Order not found');
    
    // In mock mode, we just return the order with some mock items if they don't exist
    return {
      ...order,
      items: (order as any).items || [
        {
          OrderItemID: 1,
          OrderID: order.OrderID,
          ProductID: 1,
          Quantity: 1,
          Price: order.TotalAmount,
          Name: 'Mock Item',
          ImageURL: 'https://picsum.photos/seed/jewelry/200/300'
        }
      ]
    };
  }
};
