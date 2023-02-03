<script lang="ts" setup>
import { Ref } from 'vue'
import { IAsyncGetDataTransaction } from '~/types/fetching/transaction/IAsyncGetDataTransaction'

const overlay: Ref<boolean> = useState<boolean>('loadingOverlay')

const page = ref<number>(1)
const perPage = ref<number>(10)
const filter = ref<object>({})
const sortingAscDesc = ref<{ field: string | null; type: 'ASC' | 'DESC' | null }>({
  field: null,
  type: null,
})
const {
  data: resGetDataTransaction,
  error: errGetDataTransaction,
  refresh: refreshGetDataTransaction,
}: IAsyncGetDataTransaction = await useFetch(
  () =>
    `/api/transaction?page=${page.value}&perPage=${perPage.value}&filter=${JSON.stringify(
      filter.value
    )}&sort=${JSON.stringify(sortingAscDesc.value)}`
)
const perPageSelected = ref<number>(10)
const perPageList: Ref<number[]> = ref<any[]>([5, 10, 15, 20, 25, 30, 50, 100, 'all'])

watch(perPageSelected, async function (val) {
  overlay.value = true
  page.value = 1
  perPage.value = val
  await refreshGetDataTransaction()
  overlay.value = false
})

const prevData = async () => {
  if (page.value === 1) return alert('No data available')
  overlay.value = true
  page.value = page.value - 1
  await refreshGetDataTransaction()
  overlay.value = false
}

const nextData = async () => {
  const perPageX = resGetDataTransaction.value!.totalData / perPage.value
  if (page.value === Math.floor(perPageX)) return alert('No data available')
  if (resGetDataTransaction.value?.page === 'all') return alert('No data available')
  overlay.value = true
  page.value = page.value + 1
  await refreshGetDataTransaction()
  overlay.value = false
}

const searchByAccountId = ref<number>()
const search = async (field: string) => {
  overlay.value = true
  switch (field) {
    case 'account_id':
      filter.value = { account_id: searchByAccountId.value }
      break
    case 'clear':
      filter.value = {}
      break
    default:
      break
  }
  await refreshGetDataTransaction()
  overlay.value = false
}

interface ITransactions {
  amount: number
  date: string
  price: string
  symbol: string
  total: string
  transaction_code: string
}
const dialogSeeAllTransaction = ref<boolean>(false)
const historyTransactions = ref<ITransactions[]>([])
const seeAllTransaction = (transaction: ITransactions[]) => {
  historyTransactions.value = transaction
  dialogSeeAllTransaction.value = true
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
      </v-row>
      <v-table>
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Bucket start date</th>
            <th>Bucket end date</th>
            <th>Total transaction</th>
            <th>Transaction history</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, transactionKey) in resGetDataTransaction?.transaction" :key="transactionKey">
            <td>{{ transaction.account_id }}</td>
            <td>{{ transaction.bucket_start_date }}</td>
            <td>{{ transaction.bucket_end_date }}</td>
            <td>{{ transaction.transaction_count }}</td>
            <td>
              <v-btn
                color="info"
                icon
                density="compact"
                variant="text"
                @click="seeAllTransaction(transaction.transactions)"
              >
                <v-icon>mdi-eye</v-icon>
              </v-btn>
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
          Total Data : {{ useCurrencyView(`${resGetDataTransaction?.totalData}`) }}
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
    <v-dialog v-model="dialogSeeAllTransaction" max-width="800" scrollable>
      <v-card>
        <v-card-title>History transaction</v-card-title>
        <v-card-text>
          <v-row>
            <v-col
              v-for="(historyTransaction, historyTransactionKey) in historyTransactions"
              :key="historyTransactionKey"
              cols="12"
            >
              <v-sheet color="secondary" elevation="3" border rounded class="pa-2">
                NO. {{ historyTransactionKey + 1 }} <br />
                Date: <br />
                {{ historyTransaction.date }}
                <v-divider />
                Code: <br />
                {{ historyTransaction.transaction_code }}
                <v-divider />
                Symbol: <br />
                {{ historyTransaction.symbol }}
                <v-divider />
                Price: <br />
                {{ useCurrencyView(`${Math.floor(historyTransaction.price)}`) }}
                <v-divider />
                Amount: <br />
                {{ useCurrencyView(`${Math.floor(historyTransaction.amount)}`) }}
                <v-divider />
                Total: <br />
                {{ useCurrencyView(`${Math.floor(historyTransaction.total)}`) }}
              </v-sheet>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" block @click="dialogSeeAllTransaction = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </ClientOnly>
</template>

<style scoped></style>
