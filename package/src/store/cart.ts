import { defineStore } from 'pinia';
import { CART_STORAGE } from '../hooks';
import { useProductStore } from './products';

export interface Order {
    sku_id: number;
    product_id: number;
    quantity: number;
}

interface CartState {
    contents: Record<string, Order>;
}

export interface CartPreview {
    id: number;
    image: string;
    title: string;
    quantity: number;
    cost: number;
}

export const useCartStore = defineStore({
    id: 'cart',

    state: (): CartState => ({
        contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {}
    }),
    getters: {
        count(): number {
            return Object.keys(this.contents).reduce((acc, id) => {
                return acc + this.contents[id].quantity;
            }, 0);
        },
        list(): Order[] {
            const products = useProductStore();

            if (!products.loaded) return [];
            return Object.keys(this.contents).map((sku_id) => {
                const purchase = this.contents[sku_id];

                return {
                    sku_id: purchase.sku_id,
                    product_id: products.items[purchase.product_id].id,
                    quantity: purchase.quantity
                };
            });
        },
        total(): number {
            const products = useProductStore();
            return Object.keys(this.contents).reduce((acc, id) => {
                var price: number;
                if (products.items[id]) {
                    return acc + products.items[id].sku[0].price * this.contents[id].quantity;
                } else {
                    return 0;
                }
            }, 0);
        },
        countCoupon(): number {
            // var coupons = 0;
            // this.formattedCart.forEach((element) => {
            //     if (element.cost >= 50000) {
            //         console.log(element);
            //         coupons += 1;
            //     } else {
            //         if (coupons != 0) {
            //             coupons -= 1;
            //         }
            //     }
            // });
            // if (this.total >= 100000) {
            //     coupons += Math.floor(this.total / 100000);
            // } else {
            //     if (coupons != 0) {
            //         coupons -= 1;
            //     }
            // }
            return Object.keys(this.contents).reduce((acc, id) => {
                const products = useProductStore();
                var coupons = 0;
                if (products.items[id]) {
                    const purchase = products.items[id].sku[0].price * this.contents[id].quantity;
                    const total = acc + purchase;
                    if (purchase >= 50000) {
                        console.log(purchase);
                        coupons += 1;
                        console.log(coupons);
                    }
                    if (total >= 100000) {
                        coupons += Math.floor(total / 100000);
                    }
                    return coupons;
                }
                return coupons;
            }, 0);
        },
        formattedCart(): CartPreview[] {
            const products = useProductStore();

            if (!products.loaded) return [];

            return Object.keys(this.contents).map((sku_id) => {
                const purchase = this.contents[sku_id];

                return {
                    id: purchase.sku_id,
                    image: import.meta.env.VITE_API_URL + 'product/photo/' + products.items[purchase.product_id].id,
                    title: products.items[purchase.product_id].name,
                    quantity: purchase.quantity,
                    cost: purchase.quantity * products.items[purchase.product_id].sku[0].price
                };
            });
        }
    },
    actions: {
        add(product: any) {
            if (this.contents[product.id]) {
                this.contents[product.id].quantity += 1;
            } else {
                this.contents[product.id] = {
                    sku_id: product.sku[0].id,
                    product_id: product.id,
                    quantity: 1
                };
            }
        },
        remove(product: any) {
            if (!this.contents[product.id]) {
                return;
            }

            this.contents[product.id].quantity -= 1;

            if (this.contents[product.id].quantity === 0) {
                delete this.contents[product.id];
            }
        },
        deleteAllRecord() {
            this.$reset();
            localStorage.removeItem(CART_STORAGE);
        }
    }
});
