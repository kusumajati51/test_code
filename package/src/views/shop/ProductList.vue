<template>
    <v-row>
        <v-col cols="4" v-for="(product, i) in products" :key="i">
            <ProductItem :product="product" @putChard="saveProduct" />
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { forEach } from 'lodash';
import { computed, onMounted, ref } from 'vue';

import ProductItem from '../../components/shop/ProductItem.vue';
import api from '@/axios';
import { useProductStore } from '../../store/products';
import { useCartStore } from '../../store/cart';

const productStore = useProductStore();
const cartStore = useCartStore()
const cProducts = computed(() => productStore.list);
const products = computed(() => cProducts.value)
onMounted(() => {
    productStore.fetchAll()
})

function saveProduct(product:any) {
    cartStore.add(product)
}
// export default {
//     components: { ProductItem },
//     data() {
//         return {
//             products: [] as any[]
//         };
//     },
//     async created() {
//         await this.listProduct();
//     },
//     methods: {
//         async listProduct() {
//             var d = await api.get('/product');
//             this.products = d.data;
//         }
//     }
// };
</script>
