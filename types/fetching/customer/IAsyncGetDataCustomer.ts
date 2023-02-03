import { Ref } from 'vue'
import { IMethodResultGetDataCustomer } from '~/types/server/models/customer/IMethodResult'
import { H3Error } from 'h3'

export interface IAsyncGetDataCustomer {
  data: Ref<IMethodResultGetDataCustomer | null>
  error: Ref<H3Error | null>
  refresh: (opts?: { dedupe?: boolean }) => Promise<void>
}
