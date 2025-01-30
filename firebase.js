// Configurações do Firebase com as credenciais fornecidas
const firebaseConfig = {
  apiKey: "AIzaSyBe_IQ94B8HndgT91IGUK1UHXa9p_88Kkg",
  authDomain: "whatsapp-b95fa.firebaseapp.com",
  projectId: "whatsapp-b95fa",
  storageBucket: "whatsapp-b95fa.appspot.com",
  messagingSenderId: "492675366043",
  appId: "1:492675366043:android:aafc6fd2b1991c541c9a3e",
  measurementId: "G-XXXXXXX",
  databaseURL: "https://whatsapp-b95fa-default-rtdb.firebaseio.com/"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const realTimeDb = firebase.database();
