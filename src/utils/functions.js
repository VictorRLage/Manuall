export function logoff() {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("TIPO_USUARIO");
    window.location.href = "/";
}

export function formatAs(as, value) {
    switch (as) {
        case "CPF":
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        case "telefone":
            return `(${value.substring(0, 2)}) ${value.substring(
                2,
                6,
            )}-${value.substring(6, 11)}`;
        case "cpf":
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
}
