import { model, Model, Schema } from 'mongoose'
import { ISchema } from '~/types/server/models/customer/ISchema'
import { IMethods } from '~/types/server/models/customer/IMethods'
import { IDataMethodGetDataCustomer } from '~/types/server/models/customer/IDataMethod'
import { IMethodResultGetDataCustomer } from '~/types/server/models/customer/IMethodResult'

class CustomerModel implements IMethods {
  private readonly model: Model<ISchema>

  constructor() {
    const customerSchema = new Schema<ISchema>(
      {
        name: {
          type: String,
        },
        email: {
          type: String,
        },
        accounts: [
          {
            type: Number,
          },
        ],
        active: {
          type: Boolean,
        },
        address: {
          type: String,
        },
        birthdate: {
          type: String,
        },
        username: {
          type: String,
        },
        tier_and_details: {
          type: Map,
          of: {
            type: Object,
            properties: {
              tier: {
                type: String,
              },
              id: {
                type: String,
              },
              active: {
                type: Boolean,
              },
              benefits: {
                type: [String],
              },
            },
          },
        },
      },
      {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      }
    )

    this.model = model<ISchema>('customer', customerSchema)
  }

  public async getDataCustomer(data: IDataMethodGetDataCustomer): Promise<IMethodResultGetDataCustomer | false> {
    try {
      const query = this.model.find(data.filter)
      const totalData = await this.model.countDocuments()

      if (data.perPage !== 'all') {
        query.skip((data.page - 1) * data.perPage).limit(data.perPage)
      }

      // sorting asc / desc
      if (data.sort.field) {
        const sort: any = {}
        sort[data.sort.field] = data.sort.type === 'ASC' ? 1 : -1
        query.sort(sort)
      }

      const customer = await query.exec()
      return {
        customer,
        totalData,
        perPage: data.perPage === 'all' ? totalData : data.perPage,
        page: data.page === 'all' ? 'all' : data.page,
      }
    } catch (e) {
      console.error('getDataCustomer function failed to run', e)
      return false
    }
  }
}

export default new CustomerModel()
