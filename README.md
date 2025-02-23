# Setup 
To get the code running correctly, follow these steps: 
- Get TypeScript installed: run "npm install -g typescript" 
- Initalize TypeScript: navigate to "scripts" directory, run "tsc -init" 

# Running code after changes 
To get the code to run on the webpage after changes, follow these steps: 
- Transpile TypeScript code: navigate to "scripts" directory, run "tsc {filename}.ts"
- The above step will need to be followed for every .ts file in the scripts directory
- Run the webpage as you normally would

## Alternative to transpiling each file
To set up tsc to automatically compile updated .ts files in "scrips", run "tsc -w" 