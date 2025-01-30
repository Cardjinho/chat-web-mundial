// Função para login
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      window.location.href = "chat.html"; // Redireciona para a tela de chat
    })
    .catch(error => {
      console.error(error.message);
    });
}

// Função para enviar mensagens
function sendMessage() {
  const message = document.getElementById('message').value;
  
  db.collection("messages").add({
    message: message,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    console.log("Mensagem enviada!");
  })
  .catch(error => {
    console.error("Erro ao enviar mensagem: ", error);
  });
}

// Função para upload de arquivos
function uploadFile() {
  const file = document.getElementById('fileInput').files[0];
  const storageRef = storage.ref('files/' + file.name);
  
  storageRef.put(file).then(() => {
    console.log("Arquivo enviado!");
  }).catch(error => {
    console.error("Erro ao enviar arquivo: ", error);
  });
}

// Função para listar usuários online
firebase.database().ref('users/').on('value', (snapshot) => {
  const users = snapshot.val();
  const userList = document.getElementById('userList');
  userList.innerHTML = '';
  for (const userId in users) {
    const li = document.createElement('li');
    li.textContent = users[userId].email;
    userList.appendChild(li);
  }
});
