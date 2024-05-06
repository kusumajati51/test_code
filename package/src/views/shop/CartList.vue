<template>
    <v-row>
        <v-col cols="4" v-for="(item, i) in formattedCart" :key="i">
            <CartItem :cart-preview="item" @add="add" @remove="remove" />
        </v-col>
        <v-col style="width: 100vw;" cols="auto">
            <v-row>
                <v-col cols="5">
                    <h1>Total </h1> {{ toCurrency(purchaseAmount) }}
                </v-col>
                <v-col cols="4">
                    <h1>Kupon </h1> {{ countCupon() }}
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="auto">
            <v-btn style="width: 100vw; height: 5vh;" color="primary" @click="order">
                Order
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart';
import { useProductStore } from '@/store/products';
import { computed, onMounted } from 'vue';
import CartItem from '../../components/shop/CartItem.vue';
import { BellIcon } from 'vue-tabler-icons';
import api from '@/axios';
import { forEach } from 'lodash';
import { router } from '@/router';
import { number } from 'yup';
onMounted(() => {
    productStore.fetchAll()

})
const cartStore = useCartStore()
const productStore = useProductStore()

const formattedCart = computed(() => cartStore.formattedCart)
const purchaseAmount = computed(() => cartStore.total)
const cupon = computed(() => cartStore.countCoupon)
function add(product: any) {
    cartStore.add(product)
}

function remove(product: any) {
    cartStore.remove(product)
}

async function order() {
    console.log(cartStore.list[1])
    var order = cartStore.list

    await api.post('order', order).then((res) => {
        console.log(res)
        cartStore.deleteAllRecord()
        router.push('/history');
    }).catch((error) => {
        console.error(error)
    })
}

const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
})



const toCurrency = (value: number) => {
    return formatter.format(value)
}

function countCupon() {
    var coupons = 0;
    formattedCart.value.forEach(element => {
        if (element.cost >= 50000) {
            console.log(element)
            coupons = coupons + 1;
            console.log(coupons)

        } else {
            // if (coupons != 0) {
            //     coupons = coupons - 1;
            // }
        }
    });
    if (purchaseAmount.value >= 100000) {
        coupons += Math.floor(purchaseAmount.value / 100000);
    } else {
        // if (coupons != 0) {
        //     coupons -= 1;
        // }
    }
    return coupons
}
</script>