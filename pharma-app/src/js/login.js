document.addEventListener('DOMContentLoaded', () =>{
  const loginForm = document.getElementById('loginForm');
  const niInput = document.getElementById('ni');
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('errorMessage');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.style.display = 'none'

    const ni = niInput.value.trim();
    const password = passwordInput.value.trim();

    if (!ni || !password) {
      errorMessage.textContent = 'Por favor, preencha todos os campos.';
      errorMessage.style.display = 'block';

      return
    }

    try {
      // exemplo de requisição de login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ni, password })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText || 'Erro ao fazer login.');
      }

      const data = await response.json();
      // redirecionar ou processar token conforme necessário
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);
      errorMessage.textContent = error.message || 'Ocorreu um erro ao efetuar login.';
      errorMessage.style.display = 'block';
    }
  });
})
