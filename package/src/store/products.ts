import api from '@/axios';
import { defineStore } from 'pinia'

 interface Sku {
    id: number;
    name: string;
    unit: number;
    price: number;
    product_id: number;
    created_at: string;
    updated_at: string;
}

 interface Product {
    id: number;
    name: string;
    code_product: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    sku: Sku[];
}
interface ProductState {
    items: Record<string, Product>;
    ids: number[];
}

 const useProductStore = defineStore({
    id: 'products',
    state: (): ProductState => ({
        items: {},
        ids: []
    }),
    getters: {
        list(): Product[] {
            return this.ids.map((i) => this.items[i]);
        },

        loaded(): boolean {
            return this.ids.length > 0;
        }
    },
    actions: {
        async fetchAll() {
            if (this.loaded) return;

            const res = await api.get('/product');
            
            const data: Product[] = await res.data;
            this.ids = data.map((product) => {
                this.items[product.id] = product;
                return product.id;
            });
        }
    }
 });

export { useProductStore, Product, Sku };
