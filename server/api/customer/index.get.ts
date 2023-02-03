import { TResponseIndex } from '~/types/server/api/customer/TResponse'
import { H3Error } from 'h3'
import { IDataMethodGetDataCustomer } from '~/types/server/models/customer/IDataMethod'
import { IMethodResultGetDataCustomer } from '~/types/server/models/customer/IMethodResult'
import CustomerModel from '~/server/models/customer.model'

export default defineEventHandler(async (event): TResponseIndex => {
  const resError = (statusCode: number, statusMessage: string): H3Error => {
    return createError({
      statusCode,
      statusMessage,
    })
  }

  const query: any = getQuery(event)
  const dataMethodGetDataCustomer: IDataMethodGetDataCustomer = {
    page: query.page,
    perPage: query.perPage,
    filter: JSON.parse(query.filter),
    sort: JSON.parse(query.sort),
  }
  const getDataCustomer: IMethodResultGetDataCustomer | false = await CustomerModel.getDataCustomer(
    dataMethodGetDataCustomer
  )
  if (!getDataCustomer) return resError(500, 'Something wrong with our system, Please try again letter')
  return getDataCustomer
})
