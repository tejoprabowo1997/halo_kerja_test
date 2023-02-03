import { TResponseIndex } from '~/types/server/api/transaction/TResponse'
import { H3Error } from 'h3'
import { IDataMethodGetDataTransaction } from '~/types/server/models/transactions/IDataMethod'
import { IMethodResultGetDataTransaction } from '~/types/server/models/transactions/IMethodResult'
import TransactionModel from '~/server/models/transaction.model'

export default defineEventHandler(async (event): TResponseIndex => {
  const resError = (statusCode: number, statusMessage: string): H3Error => {
    return createError({
      statusCode,
      statusMessage,
    })
  }

  const query: any = getQuery(event)
  const dataMethodGetDataCustomer: IDataMethodGetDataTransaction = {
    page: query.page,
    perPage: query.perPage,
    filter: JSON.parse(query.filter),
    sort: JSON.parse(query.sort),
  }
  const getDataTransaction: IMethodResultGetDataTransaction | false = await TransactionModel.getDataTransaction(
    dataMethodGetDataCustomer
  )
  if (!getDataTransaction) return resError(500, 'Something wrong with our system, Please try again letter')
  return getDataTransaction
})
