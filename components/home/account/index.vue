<script lang="ts" setup>
import { IAsyncGetDataAccount } from '~/types/fetching/account/IAsyncGetDataAccount'
import { Ref } from 'vue'

const overlay: Ref<boolean> = useState<boolean>('loadingOverlay')

const page = ref<number>(1)
const perPage = ref<number>(10)
const filter = ref<object>({})
const sortingAscDesc = ref<{ field: string | null; type: 'ASC' | 'DESC' | null }>({
  field: null,
  type: null,
})
const {
  data: resGetDataAccount,
  error: errGetDataAccount,
  refresh: refreshGetDataAccount,
}: IAsyncGetDataAccount = await useFetch(
  () =>
    `/api/account?page=${page.value}&perPage=${perPage.value}&filter=${JSON.stringify(
      filter.value
    )}&sort=${JSON.stringify(sortingAscDesc.value)}`
)

const perPageSelected = ref<number>(10)
const perPageList: Ref<number[]> = ref<any[]>([5, 10, 15, 20, 25, 30, 50, 100, 'all'])

watch(perPageSelected, async function (val) {
  overlay.value = true
  page.value = 1
  perPage.value = val
  await refreshGetDataAccount()
  overlay.value = false
})

const prevData = async () => {
  if (page.value === 1) return alert('No data available')
  overlay.value = true
  page.value = page.value - 1
  await refreshGetDataAccount()
  overlay.value = false
}

const nextData = async () => {
  const perPageX = resGetDataAccount.value!.totalData / perPage.value
  if (page.value === Math.floor(perPageX)) return alert('No data available')
  if (resGetDataAccount.value?.page === 'all') return alert('No data available')
  overlay.value = true
  page.value = page.value + 1
  await refreshGetDataAccount()
  overlay.value = false
}

const sortAscDesc = async (field: string, type: 'ASC' | 'DESC' | null) => {
  overlay.value = true
  if (type === sortingAscDesc.value.type) {
    sortingAscDesc.value.field = null
    sortingAscDesc.value.type = null
  } else {
    sortingAscDesc.value.field = field
    sortingAscDesc.value.type = type
  }
  await refreshGetDataAccount()
  overlay.value = false
}

const searchByAccountId = ref<number | null>(null)
const searchByLimit = ref<number | null>(null)
const searchByProducts = ref<string | null>(null)

const search = async (field: string) => {
  overlay.value = true
  switch (field) {
    case 'account_id':
      filter.value = { account_id: searchByAccountId.value }
      break
    case 'limit':
      filter.value = { limit: searchByLimit.value }
      break
    case 'products':
      filter.value = { products: { $in: [searchByProducts.value] } }
      break
    case 'clear':
      filter.value = {}
      break
    default:
      break
  }
  await refreshGetDataAccount()
  overlay.value = false
}
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="searchByAccountId"
            type="number"
            label="Search by account ID"
            density="compact"
            variant="outlined"
            hide-details
            append-inner-icon="mdi-magnify"
            clearable
            @click:append-inner="search('account_id')"
            @click:clear="search('clear')"
          />
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model="searchByLimit"
            type="number"
            label="Search by limit"
            density="compact"
            variant="outlined"
            hide-details
            append-inner-icon="mdi-magnify"
            clearable
            @click:append-inner="search('limit')"
            @click:clear="search('clear')"
          />
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model="searchByProducts"
            label="Search by products"
            density="compact"
            variant="outlined"
            hide-details
            append-inner-icon="mdi-magnify"
            clearable
            @click:append-inner="search('products')"
            @click:clear="search('clear')"
          />
        </v-col>
      </v-row>
      <v-table>
        <thead>
          <tr>
            <th>
              Account ID
              <v-icon
                :color="sortingAscDesc.field === 'account_id' && sortingAscDesc.type === 'ASC' ? 'secondary' : ''"
                @click="sortAscDesc('account_id', 'ASC')"
              >
                mdi-arrow-up-thin
              </v-icon>
              <v-icon
                :color="sortingAscDesc.field === 'account_id' && sortingAscDesc.type === 'DESC' ? 'secondary' : ''"
                @click="sortAscDesc('account_id', 'DESC')"
              >
                mdi-arrow-down-thin
              </v-icon>
            </th>
            <th>
              Limit
              <v-icon
                :color="sortingAscDesc.field === 'limit' && sortingAscDesc.type === 'ASC' ? 'secondary' : ''"
                @click="sortAscDesc('limit', 'ASC')"
              >
                mdi-arrow-up-thin
              </v-icon>
              <v-icon
                :color="sortingAscDesc.field === 'limit' && sortingAscDesc.type === 'DESC' ? 'secondary' : ''"
                @click="sortAscDesc('limit', 'DESC')"
              >
                mdi-arrow-down-thin
              </v-icon>
            </th>
            <th>
              Products
              <v-icon
                :color="sortingAscDesc.field === 'products' && sortingAscDesc.type === 'ASC' ? 'secondary' : ''"
                @click="sortAscDesc('products', 'ASC')"
              >
                mdi-arrow-up-thin
              </v-icon>
              <v-icon
                :color="sortingAscDesc.field === 'products' && sortingAscDesc.type === 'DESC' ? 'secondary' : ''"
                @click="sortAscDesc('products', 'DESC')"
              >
                mdi-arrow-down-thin
              </v-icon>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(account, accountKey) in resGetDataAccount?.account" :key="accountKey">
            <td>{{ account.account_id }}</td>
            <td>{{ account.limit }}</td>
            <td>
              <v-chip v-for="(product, productKey) in account.products" :key="productKey" class="mr-3">
                {{ product }}
              </v-chip>
            </td>
          </tr>
        </tbody>
      </v-table>
      <v-row class="mt-10">
        <v-col cols="12" xl="3" lg="3" md="4" sm="12" xs="12">
          <v-select
            v-model="perPageSelected"
            :items="perPageList"
            label="Show"
            density="compact"
            variant="outlined"
            hide-details
          />
          Total Data: {{ useCurrencyView(`${resGetDataAccount?.totalData}`) }}
        </v-col>
        <v-col cols="12" xl="9" lg="9" md="8" sm="12" xs="12" align-self="center" align="end">
          <div class="d-flex justify-end align-center">
            <div class="mr-5 font-weight-bold">Page {{ page }}</div>
            <v-btn color="primary" icon density="compact" class="mr-2" @click="prevData">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn color="primary" icon density="compact" @click="nextData">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
