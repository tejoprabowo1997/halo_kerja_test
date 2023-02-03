import { IMethodResultGetDataAccount, IMethodResultGetDetailAccount } from '~/types/server/models/account/IMethodResult'
import { H3Error } from 'h3'

export type TResponseIndex = Promise<IMethodResultGetDataAccount | H3Error>
export type TResponseDetail = Promise<IMethodResultGetDetailAccount | H3Error>
