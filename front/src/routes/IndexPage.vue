<script setup lang="ts">
import { Button, Column, DataTable, Popover, Select } from 'primevue';
import { nextTick, ref } from 'vue';

import type { Customer } from '@/types';

import { mockCustomers } from '@/mockCustomers';

function normalizeCustomers(customers: Customer[]) {
  return customers.map((customer) => ({
    id: customer.client_id,
    name: `${customer.first_name} ${customer.last_name}`,
    phone: customer.phone_number,
    email: customer.email,
    chance: customer.purchase_probability,
    seasonality: customer.features.seasonality_pattern,
    key_factors: customer.key_factors,
    recommendation: customer.recommendation_text,
    purchases: customer.purchases.map((purchase, index) => ({
      id: `${customer.client_id}-${index}`,
      ...purchase
    }))
  }));
}

const op = ref();
const selectedCustomer = ref();

const displayRecommendation = (event, customerData) => {
  op.value.hide();

  if (selectedCustomer.value?.id === customerData.id) {
    selectedCustomer.value = null;
  } else {
    selectedCustomer.value = customerData;

    nextTick(() => {
      op.value.show(event);
    });
  }
};

const customers = ref(normalizeCustomers(mockCustomers));

const expandedRows = ref({});

const formatCurrency = (value) => {
  return value.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB' });
};

const periods = [
  { name: 'Последние 3 месяца', code: 0 },
  { name: 'Последние 6 месяцев', code: 1 },
  { name: 'Последние 2 года', code: 2 }
];

const selectedPeriod = ref(periods[0]);
</script>

<template>
  <main>
    <DataTable
      v-model:expanded-rows="expandedRows"
      :value="customers"
      data-key="id"
      paginator :rows="5" :rows-per-page-options="[5, 10, 20, 50]"
      removable-sort
      striped-rows
      sort-field="chance" :sort-order="1"
      style="margin-top: 60px;"
    >
      <template #header>
        <div class="card flex justify-center">
          <Select
            v-model="selectedPeriod"
            :options="periods" option-label="name" placeholder="Select a City"
            style="width: 240px;"
          />
        </div>
      </template>
      <Column expander style="width: 5rem" />
      <Column sortable field="name" header="Имя Фамилия" />
      <Column field="phone" header="Телефон" />
      <Column field="email" header="Email" />
      <Column sortable field="seasonality" header="Сезонность" />
      <Column
        sortable field="chance" header="Шанс покупки"
        style="text-align: center;"
      >
        <template #body="slotProps">
          {{ slotProps.data.chance * 100 }}%
        </template>
      </Column>
      <Column
        field="recommendation" header="Рекомендации"
      >
        <template #body="slotProps">
          <Button
            type="button"
            icon="pi pi-ellipsis-h"
            severity="secondary"
            rounded
            @click="displayRecommendation($event, slotProps.data)"
          />
        </template>
      </Column>

      <template #expansion="slotProps">
        <div style="margin-left: 5rem;">
          <h4>Заказы</h4>
          <DataTable :value="slotProps.data.purchases">
            <Column field="product_name" header="Наименование" />
            <Column field="category" header="Категория" />
            <Column field="price" header="Сумма">
              <template #body="slotProps">
                {{ formatCurrency(slotProps.data.price) }}
              </template>
            </Column>
            <Column field="date" header="Дата" />
          </DataTable>
        </div>
      </template>
    </DataTable>

    <Popover ref="op" :class="$style.popover">
      <div>
        <h5>Рекомендация</h5>
        <p>
          {{ selectedCustomer.recommendation }}
        </p>
      </div>

      <div>
        <h5>Ключевые факторы</h5>
        <ul class="text-sm">
          <li v-for="factor in selectedCustomer.key_factors" :key="factor">
            - {{ factor }}
          </li>
        </ul>
      </div>
    </Popover>
  </main>
</template>

<style module>
.popover {
  max-width: 480px;

  div[data-pc-section='content'] {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}
</style>

<style scoped>
main {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
