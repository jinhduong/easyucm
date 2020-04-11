import admin from 'firebase-admin'
const serviceAccount = require('../../easyucm.config.json')

export class Db {
    db: FirebaseFirestore.Firestore
    accountCollection: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData
    >
    ucmCollection: FirebaseFirestore.CollectionReference<
        FirebaseFirestore.DocumentData
    >
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        })

        this.db = admin.firestore()
        this.accountCollection = this.getCollection('accounts')
        this.ucmCollection = this.getCollection('ucms')
    }

    private getCollection(collName: string) {
        return this.db.collection(collName)
    }
}

export default new Db()
