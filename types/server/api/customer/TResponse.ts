import { IMethodResultGetDataCustomer } from '~/types/server/models/customer/IMethodResult'
import { H3Error } from 'h3'

export type TResponseIndex = Promise<IMethodResultGetDataCustomer | H3Error>
