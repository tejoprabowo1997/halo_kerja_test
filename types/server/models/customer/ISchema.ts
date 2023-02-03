interface ITierAndDetails {
  tier: string
  id: string
  active: boolean
  benefits: string[]
}
export interface ISchema {
  accounts: number[]
  active: boolean
  address: string
  birthdate: string
  email: string
  name: string
  tier_and_details: { [key: string]: ITierAndDetails }
  username: string
}
