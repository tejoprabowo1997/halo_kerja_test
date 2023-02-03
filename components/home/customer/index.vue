<script lang="ts" setup>
import { Ref } from 'vue'
import { IAsyncGetDataCustomer } from '~/types/fetching/customer/IAsyncGetDataCustomer'
import { IDataMethodGetDetailAccount } from '~/types/server/models/account/IDataMethod'
import { IAsyncGetDetailAccount } from '~/types/fetching/account/IAsyncGetDetailAccount'

const overlay: Ref<boolean> = useState<boolean>('loadingOverlay')

const page = ref<number>(1)
const perPage = ref<number>(10)
const filter = ref<object>({})
const sortingAscDesc = ref<{ field: string | null; type: 'ASC' | 'DESC' | null }>({
  field: null,
  type: null,
})
const {
  data: resGetDataCustomer,
  error: errGetDataCustomer,
  refresh: refreshGetDataCustomer,
}: IAsyncGetDataCustomer = await useFetch(
  () =>
    `/api/customer?page=${page.value}&perPage=${perPage.value}&filter=${JSON.stringify(
      filter.value
    )}&sort=${JSON.stringify(sortingAscDesc.value)}`
)
const perPageSelected = ref<number>(10)
const perPageList: Ref<number[]> = ref<any[]>([5, 10, 15, 20, 25, 30, 50, 100, 'all'])

watch(perPageSelected, async function (val) {
  overlay.value = true
  page.value = 1
  perPage.value = val
  await refreshGetDataCustomer()
  overlay.value = false
})
const prevData = async () => {
  if (page.value === 1) return alert('No data available')
  overlay.value = true
  page.value = page.value - 1
  await refreshGetDataCustomer()
  overlay.value = false
}

const nextData = async () => {
  const perPageX = resGetDataCustomer.value!.totalData / perPage.value
  if (page.value === Math.floor(perPageX)) return alert('No data available')
  if (resGetDataCustomer.value?.page === 'all') return alert('No data available')
  overlay.value = true
  page.value = page.value + 1
  await refreshGetDataCustomer()
  overlay.value = false
}

const dialogDetailAccount = ref<boolean>(false)
const products = ref<string[]>([])

const sortAscDesc = async (field: string, type: 'ASC' | 'DESC' | null) => {
  overlay.value = true
  if (type === sortingAscDesc.value.type) {
    sortingAscDesc.value.field = null
    sortingAscDesc.value.type = null
  } else {
    sortingAscDesc.value.field = field
    sortingAscDesc.value.type = type
  }
  await refreshGetDataCustomer()
  overlay.value = false
}
const seeDetailAccountProduct = async (accountId: number) => {
  overlay.value = true
  const dataMethodGetDetailAccount: IDataMethodGetDetailAccount = {
    filter: {
      account_id: accountId,
    },
  }

  const { data: resGetDetailAccount, error: errGetDetailAccount }: IAsyncGetDetailAccount = await useLazyFetch(
    () => '/api/account/detail',
    {
      method: 'post',
      body: dataMethodGetDetailAccount,
    }
  )
  products.value = resGetDetailAccount.value?.products || []
  dialogDetailAccount.value = true
  overlay.value = false
}

const searchByEmail = ref<string>('')
const searchByName = ref<string>('')
const searchByUsername = ref<string>('')
const search = async (field: string) => {
  overlay.value = true
  switch (field) {
    case 'email':
      filter.value = { email: searchByEmail.value }
      break
    case 'name':
      filter.value = { name: searchByName.value }
      break
    case 'username':
      filter.value = { username: searchByUsername.value }
      break
    case 'clear':
      filter.value = {}
      break
    default:
      break
  }
  await refreshGetDataCustomer()
  overlay.value = false
}
</script>

<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="searchByName"
            label="Search by name"
            density="compact"
            variant="outlined"
            hide-details
            append-inner-icon="mdi-magnify"
            clearable
            @click:append-inner="search('name')"
            @click:clear="search('clear')"
          />
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model="searchByEmail"
            label="Search by email"
            density="compact"
            variant="outlined"
            hide-details
            append-inner-icon="mdi-magnify"
            clearable
            @click:append-inner="search('email')"
            @click:clear="search('clear')"
          />
        </v-col>

        <v-col cols="4">
          <v-text-field
            v-model="searchByUsername"
            label="Search by username"
            density="compact"
            variant="outlined"
            hide-details
            append-inner-icon="mdi-magnify"
            clearable
            @click:append-inner="search('username')"
            @click:clear="search('clear')"
          />
        </v-col>
      </v-row>
      <v-table>
        <thead>
          <tr>
            <th>Accounts</th>
            <th>Birthdate</th>
            <th>
              Email
              <v-icon
                :color="sortingAscDesc.field === 'email' && sortingAscDesc.type === 'ASC' ? 'secondary' : ''"
                @click="sortAscDesc('email', 'ASC')"
              >
                mdi-arrow-up-thin
              </v-icon>
              <v-icon
                :color="sortingAscDesc.field === 'email' && sortingAscDesc.type === 'DESC' ? 'secondary' : ''"
                @click="sortAscDesc('email', 'DESC')"
              >
                mdi-arrow-down-thin
              </v-icon>
            </th>
            <th>
              Name
              <v-icon
                :color="sortingAscDesc.field === 'name' && sortingAscDesc.type === 'ASC' ? 'secondary' : ''"
                @click="sortAscDesc('name', 'ASC')"
              >
                mdi-arrow-up-thin
              </v-icon>
              <v-icon
                :color="sortingAscDesc.field === 'name' && sortingAscDesc.type === 'DESC' ? 'secondary' : ''"
                @click="sortAscDesc('name', 'DESC')"
              >
                mdi-arrow-down-thin
              </v-icon>
            </th>
            <th>
              Username
              <v-icon
                :color="sortingAscDesc.field === 'username' && sortingAscDesc.type === 'ASC' ? 'secondary' : ''"
                @click="sortAscDesc('username', 'ASC')"
              >
                mdi-arrow-up-thin
              </v-icon>
              <v-icon
                :color="sortingAscDesc.field === 'username' && sortingAscDesc.type === 'DESC' ? 'secondary' : ''"
                @click="sortAscDesc('username', 'DESC')"
              >
                mdi-arrow-down-thin
              </v-icon>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(customer, customerKey) in resGetDataCustomer?.customer" :key="customerKey">
            <td>
              <v-chip
                v-for="(account, accountKey) in customer.accounts"
                :key="accountKey"
                color="secondary"
                density="compact"
                variant="text"
                @click="seeDetailAccountProduct(account)"
              >
                {{ account }}
              </v-chip>
            </td>
            <td>{{ useMoment(customer.birthdate) }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.username }}</td>
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
          Total Data : {{ useCurrencyView(`${resGetDataCustomer?.totalData}`) }}
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

  <ClientOnly>
    <v-dialog v-model="dialogDetailAccount" max-width="500">
      <v-card>
        <v-card-title>List Product</v-card-title>
        <v-card-text>
          <v-list :items="products" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block @click="dialogDetailAccount = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ClientOnly>
</template>

<style scoped></style>
