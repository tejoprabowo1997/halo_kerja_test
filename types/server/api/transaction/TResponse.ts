import { IMethodResultGetDataTransaction } from '~/types/server/models/transactions/IMethodResult'
import { H3Error } from 'h3'

export type TResponseIndex = Promise<IMethodResultGetDataTransaction | H3Error>
