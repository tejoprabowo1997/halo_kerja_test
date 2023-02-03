import { Ref } from 'vue'
import { IMethodResultGetDataTransaction } from '~/types/server/models/transactions/IMethodResult'
import { H3Error } from 'h3'

export interface IAsyncGetDataTransaction {
  data: Ref<IMethodResultGetDataTransaction | null>
  error: Ref<H3Error | null>
  refresh: (opts?: { dedupe?: boolean }) => Promise<void>
}
