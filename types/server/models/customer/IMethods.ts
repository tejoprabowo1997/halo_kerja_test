import { IDataMethodGetDataCustomer } from '~/types/server/models/customer/IDataMethod'
import { IMethodResultGetDataCustomer } from '~/types/server/models/customer/IMethodResult'

export interface IMethods {
  getDataCustomer(data: IDataMethodGetDataCustomer): Promise<IMethodResultGetDataCustomer | false>
}
