document.getElementById('CPFB').addEventListener('input', function (e) {
    var value = e.target.value;
    var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
        .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
        .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
    e.target.value = cpfPattern;
});

function validaCPF(cpf) {
    cpf = cpf.replace(/\D+/g, '');
    if (cpf.length !== 11) return false;

    let soma = 0;
    let resto;
    if (/^(\d)\1{10}$/.test(cpf)) return false; // Verifica sequências iguais

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function valida_cpf_benef(cpf) {
    var cpf = document.getElementById('CPFB').value;

    if (!validaCPF(cpf)) {
        event.preventDefault(); // Impede o envio do formulário
        ModalDialog("CPF inválido", "Verifique o número digitado."); //Exibe o Modal
        document.getElementById('CPFB').focus(); // Foca no campo de CPF após o erro
    }
    else {
        if (!validaCPF(cpf)) {
            event.preventDefault(); // Impede o envio do formulário
            ModalDialog("CPF inválido", "Verifique o número digitado."); //Exibe o Modal
            document.getElementById('CPFB').focus(); // Foca no campo de CPF após o erro
        }
        else {
            var cpfb = document.getElementById('CPFB').value;
            var nomeb = document.getElementById('NomeB').value;

            var url = window.location.href;
            var array = url.split('/');
            var lastsegment = array[array.length - 1];
            var idcliente = lastsegment;

            const beneficiario = {
                CPFB: cpfb,
                NomeB: nomeb,
                IdCliente: idcliente
            }

            $.ajax(
                {
                    type: "POST",
                    data: JSON.stringify(beneficiario),
                    url: "/Beneficiario/Incluir",
                    contentType: "application/json",
                    success:
                        function (resultado) {
                            ModalDialog("Cadastro de Beneficiário", resultado + "."); //Exibe o Modal

                            if (resultado != 'CPF já cadastrado!') {
                                document.getElementById('CPFB').value = '';
                                document.getElementById('NomeB').value = '';
                                document.getElementById('CPFB').focus();
                                //Atualizar Grid
                            }
                        },
                    error:
                        function (resultado) {
                            ModalDialog("Cadastro de Beneficiário", 'Erro: ' + resultado + "."); //Exibe o Modal
                        },
                })
        }
    }
}

function obterId() {
   
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalBeneficiario");

    modal.addEventListener("show", function () {
        //console.log("A modal foi carregada!")

        const url = "/Beneficiario/BeneficiarioList";
        
        fetch(url)

            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar os dados");
                }
                return response.json();
            })
            .then(data => {
                const tableBody = document.querySelector("#beneficiariosTable tbody");
                tableBody.innerHTML = ""; // Limpa linhas existentes

                data.forEach(beneficiario => {
                    const row = `
                    <tr>
                        <td>${beneficiario.cpfb}</td>
                        <td>${beneficiario.nome}</td>
                        <td>
                            <button class="btn btn-warning btn-alterar" data-id="${beneficiario.id}">Alterar</button>
                            <button class="btn btn-danger btn-excluir" data-id="${beneficiario.id}">Excluir</button>
                        </td>
                    </tr>
                `;
                    tableBody.innerHTML += row;
                });

                // Adiciona os eventos aos botões
                document.querySelectorAll(".btn-alterar").forEach(button => {
                    button.addEventListener("click", alterarBeneficiario);
                });

                document.querySelectorAll(".btn-excluir").forEach(button => {
                    button.addEventListener("click", excluirBeneficiario);
                });
            })
            .catch(error => console.error("Erro:", error));
    });
});

// Função para alterar beneficiário
function alterarBeneficiario(event) {
    const id = event.target.dataset.id;
    alert(`Alterar beneficiário com ID: ${id}`);
    // Aqui você pode abrir um modal ou redirecionar para outra página
}

// Função para excluir beneficiário
function excluirBeneficiario(event) {
    const id = event.target.dataset.id;
    if (confirm(`Tem certeza de que deseja excluir o beneficiário com ID: ${id}?`)) {
        alert(`Excluir beneficiário com ID: ${id}`);
        // Aqui você pode chamar uma API para excluir o beneficiário no servidor
    }
}
