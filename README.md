
# Validation Utility

This validation utility provides functions to validate object fields based on rules such as `min`, `max`, `pattern`, and `required` status. It includes comprehensive error handling and field validation for string and number values.

## Installation

To install this utility, you can add it to your project with npm:

```bash
npm install <package-name>
```

## Usage

### Importing the Module

After installing, you can import the `validate` function directly:

```javascript
const validate = require('@i4nizer/obj-validator');
```

### The `validate` Function

The `validate` function checks an object against a defined schema of fields. It verifies required fields, enforces minimum/maximum constraints, and checks pattern matching for string fields.

#### Function Signature

```typescript
function validate(
    fields: { name: string, min?: number, max?: number, pattern?: RegExp, required?: boolean }[],
    obj: Record<string, any>
): { error: string | null, result: Record<string, any> }
```

#### Parameters

- **fields**: An array of field objects, each containing:
  - `name` (string): The field name in the object.
  - `min` (optional, number): Minimum length (for strings) or value (for numbers).
  - `max` (optional, number): Maximum length (for strings) or value (for numbers).
  - `pattern` (optional, RegExp): Regular expression pattern to match (for strings).
  - `required` (optional, boolean): Whether the field is required. If `undefined`, it is treated as required by default.

- **obj**: The object to validate, containing field values (e.g., headers, body, query, params, etc.).

#### Returns

The `validate` function returns an object with:
- `error`: A string containing the error message if validation fails, otherwise `null`.
- `result`: An object containing the validated fields with values from `obj`.

### Example Usage

Here's a complete example of how to use the `validate` function to validate an object:

```javascript
const validate = require('<package-name>');

// Define the validation schema
const fields = [
    { name: 'username', min: 3, max: 15, required: true },
    { name: 'password', min: 8, required: true },
    { name: 'age', min: 18, max: 99 },
    { name: 'email', pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, required: true }
];

// Object to validate
const obj = {
    username: 'john_doe',
    password: 'securepassword',
    age: 25,
    email: 'john.doe@example.com'
};

// Validate the object
const result = validate(fields, obj);

if (result.error) console.log('Validation Error:', result.error);
else console.log('Validation Successful:', result.result);
```

### Example Output

If validation succeeds:

```plaintext
Validation Successful: { username: 'john_doe', password: 'securepassword', age: 25, email: 'john.doe@example.com' }
```

If there’s a validation error (e.g., `age` is less than the minimum value):

```plaintext
Validation Error: age must be at least 18
```

## License

This project is licensed under the MIT License.
