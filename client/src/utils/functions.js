export function logoff() {
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("TIPO_USUARIO")
    window.location.reload()
}