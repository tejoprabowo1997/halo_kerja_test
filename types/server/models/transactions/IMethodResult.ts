interface ITransactions {
  amount: number
  date: string
  price: string
  symbol: string
  total: string
  transaction_code: string
}
interface ITransaction {
  account_id: number
  bucket_end_date: string
  bucket_start_date: string
  transaction_count: number
  transactions: ITransactions[]
}
export interface IMethodResultGetDataTransaction {
  page: any
  perPage: any
  totalData: any
  transaction: ITransaction[]
}
