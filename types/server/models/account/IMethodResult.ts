interface IAccount {
  account_id: number
  limit: number
  products: string[]
}

export interface IMethodResultGetDataAccount {
  page: any
  perPage: any
  totalData: any
  account: IAccount[]
}

export interface IMethodResultGetDetailAccount extends IAccount {}
