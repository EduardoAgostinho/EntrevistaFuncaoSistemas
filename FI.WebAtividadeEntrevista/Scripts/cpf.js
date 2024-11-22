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
