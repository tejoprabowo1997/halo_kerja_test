import { TResponseDetail } from '~/types/server/api/account/TResponse'
import { H3Error } from 'h3'
import { IDataMethodGetDetailAccount } from '~/types/server/models/account/IDataMethod'
import { IMethodResultGetDetailAccount } from '~/types/server/models/account/IMethodResult'
import AccountModel from '~/server/models/account.model'

export default defineEventHandler(async (event): TResponseDetail => {
  const resError = (statusCode: number, statusMessage: string): H3Error => {
    return createError({
      statusCode,
      statusMessage,
    })
  }

  const dataMethodGetDetailAccount: IDataMethodGetDetailAccount = await readBody(event)
  const getDetailAccount: IMethodResultGetDetailAccount | false = await AccountModel.getDetailAccount(
    dataMethodGetDetailAccount
  )
  if (!getDetailAccount) return resError(500, 'Something wrong with our system, Please try again letter')
  return getDetailAccount
})
