import { connect, set } from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const uri: string = config.mongooDbUri
  const dbName: string = config.dbName

  set('strictQuery', true)
  main().catch((err) => console.log(err))

  async function main() {
    await connect(uri, {
      dbName,
    })
  }
})
