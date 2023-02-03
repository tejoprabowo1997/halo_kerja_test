import { IDataMethodGetDataAccount, IDataMethodGetDetailAccount } from '~/types/server/models/account/IDataMethod'
import { IMethodResultGetDataAccount, IMethodResultGetDetailAccount } from '~/types/server/models/account/IMethodResult'

export interface IMethods {
  getDataAccount(data: IDataMethodGetDataAccount): Promise<IMethodResultGetDataAccount | false>
  getDetailAccount(data: IDataMethodGetDetailAccount): Promise<IMethodResultGetDetailAccount | false>
}
