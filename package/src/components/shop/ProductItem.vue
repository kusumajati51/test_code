<template>
    <div>
        <v-card class="mx-auto my-12" max-width="374">
            <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
            </template>

            <v-img height="250" :src="url" cover></v-img>

            <v-card-item>
                <v-card-title>{{ product.name }}</v-card-title>

                <v-card-subtitle>
                    <span class="me-1">Local Favorite</span>

                    <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon>
                </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                <v-row align="center" class="mx-0">
                    <v-rating :model-value="4.5" color="amber" density="compact" size="small" half-increments
                        readonly></v-rating>

                    <div class="text-grey ms-4">4.5 (413)</div>
                </v-row>

                <div class="my-4 text-subtitle-1">Rp. {{product.sku[0].price}}</div>

            </v-card-text>

            <v-divider class="mx-4 mb-1"></v-divider>

          

            <v-card-actions>
                <v-btn color="deep-purple-lighten-2" text="Reserve" block border @click="$emit('putChard', product)"></v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script lang="ts">
export default {
    props: {
        product: {
            type: Object
        }
    },
    emits:['putChard'],
    data() {
        return {
            price: 0,
            selection: {},
            url: import.meta.env.VITE_API_URL +"product/photo/"+ this.product?.id
        };
    },
    mounted() {
        
    },
    
};
</script>
