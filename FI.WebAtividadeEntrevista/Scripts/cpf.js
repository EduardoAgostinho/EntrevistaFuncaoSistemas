document.getElementById('CPF').addEventListener('input', function (e) {
    var value = e.target.value;
    var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
        .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
        .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
    e.target.value = cpfPattern;
});

document.addEventListener("DOMContentLoaded", function () {
    const url = window.location.href; // Obtém a URL atual
    const input = document.getElementById("CPF");

    if (url.includes("Alterar")) {
        input.disabled = true; // Desabilita o campo se a URL contiver "Alterar"
    }
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

function valida_cpf(cpf) {
    var cpf = document.getElementById('CPF').value;

    if (!validaCPF(cpf)) {
        event.preventDefault(); // Impede o envio do formulário
        ModalDialog("CPF inválido", "Verifique o número digitado."); //Exibe o Modal
        document.getElementById('CPF').focus(); // Foca no campo de CPF após o erro
    }
    else {
        var vCEP = document.getElementById('CEP').value;
        var vCidade = document.getElementById('Cidade').value;
        var vEmail = document.getElementById('Email').value;
        var vEstado = document.getElementById('Estado').value;
        var vLogradouro = document.getElementById('Logradouro').value;
        var vNacionalidade = document.getElementById('Nacionalidade').value;
        var vNome = document.getElementById('Nome').value;
        var vSobrenome = document.getElementById('Sobrenome').value;
        var vCPF = document.getElementById('CPF').value;
        var vTelefone = document.getElementById('Telefone').value;

        const cliente = {
            CEP: vCEP,
            Cidade: vCidade,
            Email: vEmail,
            Estado: vEstado,
            Logradouro: vLogradouro,
            Nacionalidade: vNacionalidade,
            Nome: vNome,
            Sobrenome: vSobrenome,
            CPF: vCPF,
            Telefone: vTelefone
        }

        var inclusao = ehInclusao();

        if (inclusao) {
            $.ajax(
                {
                    type: "POST",
                    data: JSON.stringify(cliente),
                    url: "/Cliente/Incluir",
                    contentType: "application/json",
                    success:
                        function (resultado) {
                            ModalDialog("Cadastro de Cliente", resultado + "."); //Exibe o Modal

                            if (resultado != 'CPF já cadastrado!') {
                                document.getElementById('CEP').value = '';
                                document.getElementById('Cidade').value = '';
                                document.getElementById('Email').value = '';
                                document.getElementById('Estado').value = '';
                                document.getElementById('Logradouro').value = '';
                                document.getElementById('Nacionalidade').value = '';
                                document.getElementById('Nome').value = '';
                                document.getElementById('Sobrenome').value = '';
                                document.getElementById('CPF').value = '';
                                document.getElementById('Telefone').value = '';
                            }
                        },
                    error:
                        function (resultado) {
                            ModalDialog("Cadastro de Cliente", 'Erro: ' + resultado + "."); //Exibe o Modal
                        },
                })
        }
        else {

            const vId = obterId();

            $.ajax(
                {
                    type: "POST",
                    data: JSON.stringify(cliente),
                    url: "/Cliente/Alterar/" + vId,
                    contentType: "application/json",
                    success:
                        function (resultado) {
                            ModalDialog("Alteração de Cliente", resultado + "."); //Exibe o Modal
                        },
                    error:
                        function (resultado) {
                            ModalDialog("Alteração de Cliente", 'Erro: ' + resultado + "."); //Exibe o Modal
                        },
                })


        }
    }
}

function ehInclusao() {
    var url = window.location.href;
    return url.includes('Incluir');
}

function obterId() {
    var url = window.location.href;
    var array = url.split('/');

    var lastsegment = array[array.length - 1];
    console.log(lastsegment);
    return lastsegment;
}