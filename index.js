

/**
 * Get an array of missing required fields.
 * Treats `required: undefined` as required by default.
 * 
 * @param {Array} fields Array of field objects with `name` and optional `required`.
 * @param {object} obj The object to check for field presence.
 * @returns {Array} Array of missing field names.
 */
const getMissingFields = (fields, obj) => {
    
    return fields
        .filter(field => field.required !== false) // Treat `undefined` as required
        .map(field => field.name)
        .filter(key => !(key in obj)) // Check for missing fields by key existence
}

/**
 * Validate a string field.
 * 
 * @param {object} field Field object with `name`, `min`, `max`, and `pattern`.
 * @param {string} value The value of the field to validate.
 * @returns {string|null} Error message if validation fails, otherwise null.
 */
const validateStringField = (field, value) => {
    const length = value.trim().length

    if ('min' in field && length < field.min) return `${field.name} length must be at least ${field.min} characters`
    if ('max' in field && length > field.max) return `${field.name} length must be under ${field.max} characters`
    if ('pattern' in field && !field.pattern.test(value)) return `${field.name} must match the pattern ${field.pattern}`

    return null
}

/**
 * Validate a number field.
 * 
 * @param {object} field Field object with `name`, `min`, and `max`.
 * @param {number} value The value of the field to validate.
 * @returns {string|null} Error message if validation fails, otherwise null.
 */
const validateNumberField = (field, value) => {
    
    if ('min' in field && value < field.min) return `${field.name} must be at least ${field.min}`
    if ('max' in field && value > field.max) return `${field.name} must be under ${field.max}`

    return null
}

/**
 * Validate a single field, delegating to the appropriate validation method.
 * 
 * @param {object} field Field object to validate.
 * @param {*} value The value of the field in `obj`.
 * @returns {string|null} Error message if validation fails, otherwise null.
 */
const validateField = (field, value) => {
    
    if (typeof value === 'string') return validateStringField(field, value)
    else if (typeof value === 'number') return validateNumberField(field, value)
    
    return null
}

/**
 * Validate an object based on fields.
 * 
 * @param {{ name: string, min?: number, max?: number, pattern?: RegExp, required?: boolean }[]} fields Array of field objects to validate.
 * @param {object} obj The object containing field values (e.g. headers, body, query, params, etc).
 * @returns {{ error: string, result: Object }} An object that contains error if there is and result object containing the fields with values from obj.
 */
const validate = (fields, obj) => {
    
    // Contain status and fields
    const status = { error: null, result: {} }

    // Check for missing fields
    const missingFields = getMissingFields(fields, obj)
    if (missingFields.length !== 0) status.error = `Fields (${missingFields.join(', ')}) are required`

    // Validate each field
    for (const field of fields) {
        if (status.error) break
        const value = obj[field.name]
        const error = validateField(field, value)
        
        if (error) status.error = error
    }

    // validation status
    return status
}


module.exports = validate