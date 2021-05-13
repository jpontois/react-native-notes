import firebase from 'firebase'
import '@firebase/firestore'

var firebaseConfig = {
	apiKey: "AIzaSyBmux_CkWXY-D7bJxEJpe9bz5V3jwIdrsg",
	authDomain: "todozero-bf566.firebaseapp.com",
	projectId: "todozero-bf566",
	storageBucket: "todozero-bf566.appspot.com",
	messagingSenderId: "1069944989075",
	appId: "1:1069944989075:web:5a102c5118ac441e627466"
}

export default class Fire {
	constructor (callback) {
		this.init(callback)
	}

	init (callback) {
		if (!firebase.apps.length) {
			firebase.initializeApp(firebaseConfig)
		}

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				callback(null)
			} else {
				firebase.auth().signInAnonymously().catch(e => {
					callback(e)
				})
			}
		})
	}

	get ref() {
		return firebase.firestore().collection('list');
	}
	
	getLists (callback) {
		let ref = this.ref.orderBy('label')
		this.unsubscribe = ref.onSnapshot(snapshot => {
			let lists = []
			snapshot.forEach(item => {
				lists.push({id: item.id, ...item.data()})
			})
			callback(lists)
		}, (e) => console.log(e)
		)
	}
	
	getList (id, callback) {
		let ref = this.ref.doc(id)
		this.unsubscribe = ref.onSnapshot(doc => {
			callback({
				id: doc.id,
				...doc.data()
			})
		}, (e) => console.log(e)
		)
	}

	addList (list) {
		let ref = this.ref
		ref.add(list)
	}

	updateList (list) {
		let ref = this.ref
		ref.doc(list.id).update(list)
	}

	deleteList (list) {
		let ref = this.ref
		ref.doc(list.id).delete()
	}

	detach () {
		this.unsubscribe()
	}
}

