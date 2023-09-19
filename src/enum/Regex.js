export default {
    EMAIL: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    PHONE: /^(\+84|0)[1-9][0-9]{8,9}$/,
    NAME: /^[a-zA-Z0-9]+$/,
    NUMBER: /^[0-9]+$/,
    TEXT: /^[a-zA-Z0-9\s]+$/,
    TEXT_WITHOUT_NUMBER: /^[a-zA-Z\s]+$/,
    TEXT_WITHOUT_NUMBER_AND_SPACE: /^[a-zA-Z]+$/,
    CEP: /^\d{8}$/,
}