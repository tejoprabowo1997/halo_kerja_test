import { model, Model, Schema } from 'mongoose'
import { ISchema } from '~/types/server/models/transactions/ISchema'
import { IMethods } from '~/types/server/models/transactions/IMethods'
import { IDataMethodGetDataTransaction } from '~/types/server/models/transactions/IDataMethod'
import { IMethodResultGetDataTransaction } from '~/types/server/models/transactions/IMethodResult'

class TransactionModel implements IMethods {
  private readonly model: Model<ISchema>

  constructor() {
    const transactionsSchema = new Schema<ISchema>(
      {
        account_id: {
          type: Number,
        },
        bucket_end_date: {
          type: String,
        },
        bucket_start_date: {
          type: String,
        },
        transaction_count: {
          type: Number,
        },
        transactions: [
          {
            amount: {
              type: Number,
            },
            date: {
              type: String,
            },
            price: {
              type: String,
            },
            symbol: {
              type: String,
            },
            total: {
              type: String,
            },
            transaction_code: {
              type: String,
            },
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

    this.model = model<ISchema>('transaction', transactionsSchema)
  }

  public async getDataTransaction(
    data: IDataMethodGetDataTransaction
  ): Promise<IMethodResultGetDataTransaction | false> {
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

      const transaction = await query.exec()
      return {
        transaction,
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

export default new TransactionModel()
