// Tu código original para la animación
const $btnSignIn = document.querySelector('.sign-in-btn'),
      $btnSignUp = document.querySelector('.sign-up-btn'),  
      $signUp = document.querySelector('.sign-up'),
      $signIn  = document.querySelector('.sign-in');

document.addEventListener('click', e => {
    if (e.target === $btnSignIn || e.target === $btnSignUp) {
        $signIn.classList.toggle('active');
        $signUp.classList.toggle('active');
    }
});


// --- CÓDIGO AÑADIDO PARA LA REDIRECCIÓN ---
// Esto solo añade comportamiento, no cambia el diseño.

const loginButton = document.getElementById('loginBtn');

loginButton.addEventListener('click', () => {
    // Simulas una validación exitosa
    const loginExitoso = true; 

    if (loginExitoso) {
        // Rediriges a la página principal
        window.location.href = '../index.html';
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});