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
        case "telefoneFieldShow":

        case "telefoneFieldChange":
            return `(${value.substring(0, 1) || "_"}${
                value.substring(1, 2) || "_"
            }) ${value.substring(2, 3) || "_"}${value.substring(3, 4) || "_"}${
                value.substring(3, 4) || "_"
            }${value.substring(4, 5) || "_"}${value.length > 10 ? "" : "-"}${
                value.substring(5, 6) || "_"
            }${value.length > 10 ? "-" : ""}${value.substring(6, 7) || "_"}${
                value.substring(7, 8) || "_"
            }${value.substring(8, 9) || "_"}${
                value.substring(9, 10) || "_"
            }${value.substring(10, 11)}`;
        case "cpf":
            return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
}

export async function defer() {
    await new Promise((resolve) => requestAnimationFrame(resolve));
}
