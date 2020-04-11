import { AccountModel } from '../models/account'
import db from './filestore'
import { v4 as uuidv4 } from 'uuid'

export class AccountDbImpl {
    async add(acc: AccountModel): Promise<string> {
        const token = uuidv4()
        const existsEmail = await db.accountCollection
            .where('email', '==', acc.email)
            .get()

        if (existsEmail) {
            console.log(`${acc.email} already existing`)
            return null
        }

        const accRef = db.accountCollection.doc(token)
        const result = await accRef.set({
            ...acc,
            createdAt: new Date(),
            token,
        })

        if (result.writeTime) {
            console.log(
                `add ${acc.email} with ${token} at ${result.writeTime.toDate()}`
            )
            return token
        }
        return null
    }
}

export default new AccountDbImpl()
