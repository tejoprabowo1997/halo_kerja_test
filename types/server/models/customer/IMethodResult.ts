interface ITierAndDetails {
  tier: string
  id: string
  active: boolean
  benefits: string[]
}
interface ICustomer {
  accounts: number[]
  active: boolean
  address: string
  birthdate: string
  email: string
  name: string
  tier_and_details: { [key: string]: ITierAndDetails }
  username: string
}

export interface IMethodResultGetDataCustomer {
  page: any
  perPage: any
  totalData: any
  customer: ICustomer[]
}
