export default {
    EMAIL: /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    PHONE: /^\d{11}$/,
    CEP: /^\d{8}$/,
    CPF: /^\d{11}$/,
    TEXT: /^[a-zA-Z]+$/,
    NUMBER: /^[0-9]+$/,
    NUMBER_SPACE: /^[0-9\s]+$/,
    TEXT_SPACE: /^[a-zA-Z\s]+$/,
    TEXT_NUMBER: /^[a-zA-Z0-9]+$/,
    TEXT_NUMBER_SPACE: /^[a-zA-Z0-9\s]+$/,
    BETWEEN_8_AND_24: /^.{8,24}$/,
}