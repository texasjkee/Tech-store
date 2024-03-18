// Функція для створення об'єкту помилки
const createApiError = (status, message) => {
  return {
    status,
    message
  }
}

// Функція для створення помилки "Поганий запит"
const badRequest = message => {
  return createApiError(404, message)
}

// Функція для створення внутрішньої помилки
const internal = message => {
  return createApiError(500, message)
}

// Функція доступу немає
const forbidden = message => {
  return createApiError(403, message)
}

const notFound = message => {
  return createApiError(404, message)
}

module.exports = {
  badRequest,
  internal,
  forbidden,
  notFound
}
