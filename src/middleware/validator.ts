import createError from 'http-errors'

export default (schema, property?) => {
  return (req, res, next) => {
    const options = {
      errors: {
        wrap: {
          label: '',
        },
      },
    }

    const data = property ? req[property] : req.body

    const { error } = schema.validate(data, options)
    const valid = error == null

    if (valid) {
      next()
    } else {
      const { details } = error
      const message = details.map((i) => i.message).join(',')

      next(createError.UnprocessableEntity(message))
    }
  }
}
