import db from './filestore'
import { v4 as uuidv4 } from 'uuid'

class UcmImpl {
    async addUcm(
        data: any,
        token: string
    ): Promise<{
        success: boolean
        message: string
    }> {
        const existsUcm = await db.ucmCollection.doc(token).get()
        const ucmRef = db.ucmCollection.doc(token)

        if (!existsUcm.exists) {
            const result = await ucmRef.create({
                ...data,
            })
            if (result.writeTime) {
                return {
                    success: true,
                    message: 'added ucm',
                }
            }
        } else {
            const result = await ucmRef.update({
                ...data,
            })
            if (result.writeTime) {
                return {
                    success: true,
                    message: 'updated ucm',
                }
            }
        }
    }
}

export default new UcmImpl()
