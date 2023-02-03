import { TResponseIndex } from '~/types/server/api/account/TResponse'
import { IDataMethodGetDataAccount } from '~/types/server/models/account/IDataMethod'
import { IMethodResultGetDataAccount } from '~/types/server/models/account/IMethodResult'
import AccountModel from '~/server/models/account.model'
import { H3Error } from 'h3'

export default defineEventHandler(async (event): TResponseIndex => {
  const resError = (statusCode: number, statusMessage: string): H3Error => {
    return createError({
      statusCode,
      statusMessage,
    })
  }

  const query: any = getQuery(event)
  const dataMethodGetDataAccount: IDataMethodGetDataAccount = {
    page: query.page,
    perPage: query.perPage,
    filter: JSON.parse(query.filter),
    sort: JSON.parse(query.sort),
  }

  const getDataAccount: IMethodResultGetDataAccount | false = await AccountModel.getDataAccount(
    dataMethodGetDataAccount
  )
  if (!getDataAccount) return resError(500, 'Something wrong with our system, Please try again letter')
  return getDataAccount
})
