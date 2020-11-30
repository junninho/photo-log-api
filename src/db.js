const admin = require('firebase-admin');
const serviceAccount = require('../photo-log-4f316-074e256bb256.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore();

exports.addPhoto = (photo) => {
  const docRef = db.collection('photos').doc(photo.fileName);
  
  return docRef.set(photo);
}

exports.getPhotos = async () => {
  const snapshot = await db.collection('photos').get();

  return snapshot.docs.map(param => param.data());
}