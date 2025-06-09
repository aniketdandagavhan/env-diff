# env-diff

A simple tool to compare two `.env` files and find missing or extra environment variables.

## Setup

1. Make sure Node.js is installed.
2. Run `npm install` to install dependencies.

## Usage

1. Create two files in the project root:
   - `.old.env` (e.g., dev environment)
   - `.new.env` (e.g., uat or prod environment)

2. Run the script:

```bash
node main.js
````

## Example Output

```
✅ Keys missing in NEW:
 [ 'MISSING_CRED' ]

⚠️  Extra keys in NEW:
 [ 'EXTRA_CRED' ]
```
