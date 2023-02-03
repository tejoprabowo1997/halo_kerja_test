import { model, Model, Schema, Types } from 'mongoose'
import { ISchema } from '~/types/server/models/account/ISchema'
import { IMethods } from '~/types/server/models/account/IMethods'
import { IDataMethodGetDataAccount, IDataMethodGetDetailAccount } from '~/types/server/models/account/IDataMethod'
import { IMethodResultGetDataAccount, IMethodResultGetDetailAccount } from '~/types/server/models/account/IMethodResult'

class AccountModel implements IMethods {
  private readonly model: Model<ISchema>

  constructor() {
    const accountModelSchema = new Schema<ISchema>(
      {
        account_id: {
          type: Number,
        },
        limit: {
          type: Number,
        },
        products: [
          {
            type: String,
          },
        ],
      },
      {
        timestamps: {
          createdAt: 'created_at',
          updatedAt: 'updated_at',
        },
      }
    )

    this.model = model<ISchema>('account', accountModelSchema)
  }

  public async getDataAccount(data: IDataMethodGetDataAccount): Promise<IMethodResultGetDataAccount | false> {
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

      const account = await query.exec()
      return {
        account,
        totalData,
        perPage: data.perPage === 'all' ? totalData : data.perPage,
        page: data.page === 'all' ? 'all' : data.page,
      }
    } catch (e) {
      console.error('getDataAccount function failed to run', e)
      return false
    }
  }

  public async getDetailAccount(data: IDataMethodGetDetailAccount): Promise<IMethodResultGetDetailAccount | false> {
    try {
      const { account_id } = data.filter
      const account = await this.model.findOne({ account_id })
      if (!account) return false
      return account
    } catch (e) {
      console.error('getDetailAccount function failed to run', e)
      return false
    }
  }
}

export default new AccountModel()
