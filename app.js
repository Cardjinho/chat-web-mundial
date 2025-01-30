// Função para login ou registro de usuário
function loginOrRegister() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Tenta fazer o login
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Usuário autenticado com sucesso
      console.log('Usuário logado com sucesso');
      generateKeys();  // Gera as chaves após o login
      window.location.href = "chat.html"; // Redireciona para a tela de chat
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        // Se o usuário não for encontrado, registra um novo usuário
        registerUser(email, password);
      } else {
        console.error(error.message);
      }
    });
}

// Função para registrar um novo usuário
function registerUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log('Usuário registrado com sucesso');
      generateKeys();  // Gera as chaves após o registro
      window.location.href = "chat.html"; // Redireciona para a tela de chat após o registro
    })
    .catch(error => {
      console.error('Erro ao registrar o usuário:', error.message);
    });
}

// Função para gerar chave pública e privada usando RSA
async function generateKeys() {
  try {
    // Gera o par de chaves pública e privada
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: { name: "SHA-256" },
      },
      true, // se as chaves podem ser exportadas
      ["encrypt", "decrypt"] // operações que a chave pode fazer
    );

    // Exporta a chave pública e a chave privada para armazenamento
    const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
    const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

    // Armazenando as chaves em um formato legível
    const publicKeyStr = arrayBufferToBase64(publicKey);
    const privateKeyStr = arrayBufferToBase64(privateKey);

    console.log("Chave Pública:", publicKeyStr);
    console.log("Chave Privada:", privateKeyStr);

    // Armazenar as chaves no Firebase ou localmente, conforme necessário
    storeKeys(publicKeyStr, privateKeyStr);
  } catch (error) {
    console.error('Erro ao gerar as chaves:', error);
  }
}

// Função auxiliar para converter ArrayBuffer para Base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const length = bytes.byteLength;
  for (let i = 0; i < length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Função para armazenar as chaves no Firebase
function storeKeys(publicKey, privateKey) {
  const userId = firebase.auth().currentUser.uid;  // ID do usuário autenticado

  // Armazena as chaves no Firestore
  const userKeysRef = db.collection('user_keys').doc(userId);
  userKeysRef.set({
    publicKey: publicKey,
    privateKey: privateKey,
  })
  .then(() => {
    console.log('Chaves armazenadas com sucesso no Firestore');
  })
  .catch(error => {
    console.error('Erro ao armazenar as chaves no Firestore:', error);
  });
      }
