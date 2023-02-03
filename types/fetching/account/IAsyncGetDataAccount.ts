import { Ref } from 'vue'
import { IMethodResultGetDataAccount } from '~/types/server/models/account/IMethodResult'
import { H3Error } from 'h3'

export interface IAsyncGetDataAccount {
  data: Ref<IMethodResultGetDataAccount | null>
  error: Ref<H3Error | null>
  refresh: (opts?: { dedupe?: boolean }) => Promise<void>
}
