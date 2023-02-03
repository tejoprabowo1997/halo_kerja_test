import { Ref } from 'vue'
import { H3Error } from 'h3'
import { IMethodResultGetDetailAccount } from '~/types/server/models/account/IMethodResult'

export interface IAsyncGetDetailAccount {
  data: Ref<IMethodResultGetDetailAccount | null>
  error: Ref<H3Error | null>
}
