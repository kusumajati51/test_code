<template>
    <v-row>
        <v-data-table :headers="headers" :items="historyOrder" :items-length="meta.total_rows"
            @update:options="loadItems">
            <template v-slot:item.status="{item}">
                <td>
                    {{ checkOpenOrClose(item.created_at) }}
                </td>
            </template>
        </v-data-table>
    </v-row>
</template>
<script lang="ts">

import api from '@/axios';
import { VDataTable, VDataTableServer } from 'vuetify/lib/labs/components.mjs';
export default {
    components: { VDataTable, VDataTableServer },
    data() {
        return {
            historyOrder: [],
            meta: {
                page: 1,
                limit: 10,
                total_rows: 3,
            },
            headers: [
                {
                    title: 'Order ID',
                    align: 'start',
                    sortable: true,
                    value: 'id',
                },
                {
                    title: 'Order Code',
                    key: 'code_order',
                    sortable: true,
                },
                {
                    title: 'Created At',
                    key: 'created_at',
                    sortable: true,
                },
                {
                    title: 'Updated At',
                    key: 'updated_at',
                    sortable: true,
                },
                {
                    title: 'Total Price',
                    key: 'total_price',
                    sortable: true,
                },
                {
                    title: 'Status',
                    key:'status',
                    sortable: true,
                },
            ],
        }
    },
    methods: {
        async loadItems() {
            var res: any = await api.get('order', { params: { ...this.meta } })
            this.historyOrder = res.data
            this.meta = res.meta
            console.log(this.historyOrder)
        },
        checkOpenOrClose(dateString: string): string {
            // Parse the date string into a Date object
            let date = new Date(dateString);
            
            // Get the hour in 24-hour format
            let hour = date.getUTCHours();
            
            // Check if the time is more than or equal to 15:00
            if (hour >= 15) {
                return "Close";
            } else {
                return "Open";
            }
        }
    },
    mounted() {
        this.loadItems()
    }
}
</script>