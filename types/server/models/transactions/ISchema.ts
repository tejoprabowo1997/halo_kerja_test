interface ITransactions {
  amount: number
  date: string
  price: string
  symbol: string
  total: string
  transaction_code: string
}
export interface ISchema {
  account_id: number
  bucket_end_date: string
  bucket_start_date: string
  transaction_count: number
  transactions: ITransactions[]
}
