import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

export const requestMakeAdmin = functions.https.onRequest(async (request, response) => {
	try{
		const user = await admin.auth().getUserByEmail('kevinfizu@gmail.com')
		if(user){
			await admin.auth().setCustomUserClaims(user.uid, { isAdmin: true })
			await admin.firestore()
				.collection('users')
				.doc(user.uid)
				.set({
					roles: { isAdmin: true }
				}, { merge: true })
			response.json({ message: 'kevinfizu@gmail.com upgraded to admin' }).end()
		}else{
			response.status(400).json({ message: 'kevinfizu@gmail.com doesn\'t exist' }).end()
		}
	}catch {
		response.status(400).json({ message: 'An error occurred' }).end()
	}
})
