import { IDataMethodGetDataTransaction } from '~/types/server/models/transactions/IDataMethod'
import { IMethodResultGetDataTransaction } from '~/types/server/models/transactions/IMethodResult'

export interface IMethods {
  getDataTransaction(data: IDataMethodGetDataTransaction): Promise<IMethodResultGetDataTransaction | false>
}
