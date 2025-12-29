<script>
        async function buscarUsuarios() {
            const termoBusca = document.getElementById('inputBusca').value.trim();
            const lista = document.getElementById('listaUsuarios');
            
            // Limpa a lista antes de começar a busca
            lista.innerHTML = "";

            if (termoBusca === "") {
                alert("Por favor, digite algo para pesquisar.");
                return;
            }

            try {
                // Faz a requisição para a API do GitHub
                const response = await fetch(`https://api.github.com/search/users?q=${termoBusca}`);
                const data = await response.json();

                // Verifica se há itens no array retornado
                if (data.items && data.items.length > 0) {
                    
                    data.items.forEach(user => {
                        // Cria os elementos da lista
                        const li = document.createElement('li');
                        li.className = 'usuario-item';
                        
                        li.innerHTML = `
                            <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
                            <a href="${user.html_url}" target="_blank" class="username">
                                ${user.login}
                            </a>
                        `;
                        
                        lista.appendChild(li);
                    });

                } else {
                    lista.innerHTML = '<p class="error-msg">Não foram encontrados usuários para esta pesquisa</p>';
                }

            } catch (error) {
                console.error("Erro na busca:", error);
                lista.innerHTML = '<p class="error-msg">Ocorreu um erro ao conectar com a API.</p>';
            }
        }

        // Permitir buscar ao apertar "Enter"
        document.getElementById('inputBusca').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                buscarUsuarios();
            }
        });
    </script>
