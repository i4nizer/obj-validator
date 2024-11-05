/**
 * Field object definition.
 */
interface Field {
    name: string;
    min?: number;
    max?: number;
    pattern?: RegExp;
    required?: boolean;
}

/**
 * Get an array of missing required fields.
 * Treats `required: undefined` as required by default.
 * 
 * @param fields Array of field objects with `name` and optional `required`.
 * @param obj The object to check for field presence.
 * @returns Array of missing field names.
 */
declare function getMissingFields(fields: Field[], obj: Record<string, any>): string[];

/**
 * Validate a string field.
 * 
 * @param field Field object with `name`, `min`, `max`, and `pattern`.
 * @param value The value of the field to validate.
 * @returns Error message if validation fails, otherwise null.
 */
declare function validateStringField(field: Field, value: string): string | null;

/**
 * Validate a number field.
 * 
 * @param field Field object with `name`, `min`, and `max`.
 * @param value The value of the field to validate.
 * @returns Error message if validation fails, otherwise null.
 */
declare function validateNumberField(field: Field, value: number): string | null;

/**
 * Validate a single field, delegating to the appropriate validation method.
 * 
 * @param field Field object to validate.
 * @param value The value of the field in `obj`.
 * @returns Error message if validation fails, otherwise null.
 */
declare function validateField(field: Field, value: any): string | null;

/**
 * Validation result type.
 */
interface ValidationResult {
    error: string | null;
    result: Record<string, any>;
}

/**
 * Validate an object based on fields.
 * 
 * @param fields Array of field objects to validate.
 * @param obj The object containing field values (e.g., headers, body, query, params, etc.).
 * @returns An object that contains an error if present and a result object containing the fields with values from `obj`.
 */
declare function validate(fields: Field[], obj: Record<string, any>): ValidationResult;


export { validate, Field, ValidationResult };