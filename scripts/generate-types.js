// scripts/generate-types.js
const fs = require('fs').promises;
const path = require('path');

console.log('🚀 JavaScript Type Generator starting...');

class TypeGenerator {
    constructor() {
        const projectRoot = process.cwd();
        console.log(`📍 Project root: ${projectRoot}`);

        this.config = {
            dataDir: path.join(projectRoot, 'app', 'data'),
            outputDir: path.join(projectRoot, 'app', 'modules'),
            files: [
                {
                    input: 'roomData.json',
                    output: 'rooms/types/room.types.ts',
                    rootTypeName: 'RoomData',
                    moduleName: 'rooms'
                }
            ]
        };

        // Track extracted interfaces
        this.extractedInterfaces = new Map();
        this.usedInterfaceNames = new Set();

        console.log(`📂 Data directory: ${this.config.dataDir}`);
        console.log(`📂 Output directory: ${this.config.outputDir}`);
    }

    inferType(value, depth = 0, path = '') {
        const MAX_DEPTH = 10;

        if (depth > MAX_DEPTH) return 'any';

        if (value === null) return 'null';
        if (value === undefined) return 'undefined';

        const type = typeof value;

        switch (type) {
            case 'boolean':
                return 'boolean';
            case 'number':
                return 'number';
            case 'string':
                return 'string';
            case 'object':
                if (Array.isArray(value)) {
                    return this.inferArrayType(value, depth, path);
                }
                return this.inferObjectType(value, depth, path);
            default:
                return 'unknown';
        }
    }

    inferArrayType(arr, depth, path) {
        if (arr.length === 0) return 'unknown[]';

        // For arrays, we need to find the common structure, not create separate types for each element
        // Sample a few elements to determine the type pattern
        const sampleSize = Math.min(arr.length, 5); // Sample first 5 elements
        const samples = arr.slice(0, sampleSize);

        // Check if all elements have the same structure
        const elementTypes = samples.map((item, index) => {
            // Don't include array index in path for array elements - use generic path
            const genericPath = `${path}Item`;
            return this.inferType(item, depth + 1, genericPath);
        });

        // Remove duplicates
        const uniqueTypes = [...new Set(elementTypes)];

        if (uniqueTypes.length === 1) {
            return `${uniqueTypes[0]}[]`;
        }

        // If we have different types, create a union
        return `(${uniqueTypes.join(' | ')})[]`;
    }

    inferObjectType(obj, depth, path) {
        // Check if this object should be extracted as a separate interface
        const shouldExtract = this.shouldExtractInterface(obj, depth, path);

        if (shouldExtract) {
            const interfaceName = this.generateInterfaceName(path);
            const result = this.extractInterface(obj, interfaceName, depth, path);
            return result; // This will return either the new interface name or existing one
        }

        // Generate inline object type
        const properties = [];

        for (const [key, value] of Object.entries(obj)) {
            const propType = this.inferType(value, depth + 1, `${path}.${key}`);
            const isOptional = value === null || value === undefined;

            const safeName = this.sanitizePropertyName(key);
            const optional = isOptional ? '?' : '';

            properties.push(`  ${safeName}${optional}: ${propType};`);
        }

        return `{\n${properties.join('\n')}\n}`;
    }

    shouldExtractInterface(obj, depth, path) {
        const keys = Object.keys(obj);

        // Only extract if object has many properties (5 or more for modularity)
        // This keeps simple objects inline while extracting complex ones

        if (keys.length >= 5) return true;

        // Don't extract small objects - keep them inline for simplicity
        return false;
    }

    generateInterfaceName(path) {
        // Clean up the path to create a meaningful interface name
        let name = path
            .replace(/^\./, '') // Remove leading dot
            .replace(/\[\d+\]/g, '') // Remove array indices
            .split('.')
            .filter(part => part.length > 0)
            .map(part => this.capitalize(part))
            .join('');

        if (!name) name = 'GeneratedInterface';

        // Ensure uniqueness
        let uniqueName = name;
        let counter = 1;
        while (this.usedInterfaceNames.has(uniqueName)) {
            uniqueName = `${name}${counter}`;
            counter++;
        }

        this.usedInterfaceNames.add(uniqueName);
        return uniqueName;
    }

    extractInterface(obj, interfaceName, depth, path) {
        // Check if we already have a similar interface to avoid duplicates
        const signature = this.getObjectSignature(obj);
        const existingInterface = this.findSimilarInterface(signature);

        if (existingInterface) {
            return existingInterface;
        }

        const properties = [];

        for (const [key, value] of Object.entries(obj)) {
            const propType = this.inferType(value, depth + 1, `${path}.${key}`);
            const isOptional = value === null || value === undefined;

            const safeName = this.sanitizePropertyName(key);
            const optional = isOptional ? '?' : '';

            properties.push(`  ${safeName}${optional}: ${propType};`);
        }

        const interfaceDefinition = `export interface ${interfaceName} {\n${properties.join('\n')}\n}`;

        // Store both the interface and its signature
        this.extractedInterfaces.set(interfaceName, {
            definition: interfaceDefinition,
            signature: signature
        });

        return interfaceName;
    }

    getObjectSignature(obj) {
        // Create a signature based on property names and types (not values)
        const keys = Object.keys(obj).sort();
        return keys.map(key => {
            const value = obj[key];
            const type = Array.isArray(value) ? 'array' : typeof value;
            return `${key}:${type}`;
        }).join('|');
    }

    findSimilarInterface(signature) {
        // Look for an existing interface with the same signature
        for (const [name, data] of this.extractedInterfaces.entries()) {
            if (data.signature === signature) {
                return name;
            }
        }
        return null;
    }

    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    sanitizePropertyName(name) {
        // Check if name needs quotes
        if (!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name)) {
            return `"${name}"`;
        }
        return name;
    }

    generateInterface(data, interfaceName) {
        // Reset extracted interfaces for each generation
        this.extractedInterfaces.clear();
        this.usedInterfaceNames.clear();
        this.usedInterfaceNames.add(interfaceName);

        const type = this.inferType(data, 0, interfaceName.toLowerCase());
        return `export interface ${interfaceName} ${type}`;
    }

    generateTypeFile(data, rootTypeName, inputFile, moduleName) {
        const timestamp = new Date().toISOString();
        const moduleComment = moduleName ? `Module: ${moduleName}` : '';

        let content = `/**
 * Auto-generated TypeScript types
 * Generated from: ${inputFile}
 * ${moduleComment}
 * Generated on: ${timestamp}
 * 
 * @warning Do not edit this file manually
 * Run 'npm run generate:types' to regenerate
 */

`;

        // Add all extracted interfaces first
        const extractedInterfacesList = Array.from(this.extractedInterfaces.values())
            .map(data => data.definition); // Extract just the definition part
        if (extractedInterfacesList.length > 0) {
            content += '// Extracted interfaces\n';
            content += extractedInterfacesList.join('\n\n') + '\n\n';
        }

        // Generate main interface
        content += `// Main interface\n`;
        content += this.generateInterface(data, rootTypeName);

        // Add utility types if it's an object
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            content += `\n\n// Utility types
export type ${rootTypeName}Keys = keyof ${rootTypeName};
export type Partial${rootTypeName} = Partial<${rootTypeName}>;`;

            // Add utility types for extracted interfaces
            const interfaceNames = Array.from(this.usedInterfaceNames);
            if (interfaceNames.length > 1) {
                content += `\n\n// Union types
export type AnyInterface = ${interfaceNames.join(' | ')};`;
            }
        }

        // Add default export
        content += `\n\nexport default ${rootTypeName};`;

        return content;
    }

    async ensureDirectory(dirPath) {
        try {
            await fs.access(dirPath);
            console.log(`✅ Directory exists: ${dirPath}`);
        } catch {
            await fs.mkdir(dirPath, { recursive: true });
            console.log(`📁 Created directory: ${dirPath}`);
        }
    }

    async validateJsonFile(filePath) {
        console.log(`📖 Reading file: ${filePath}`);

        try {
            const content = await fs.readFile(filePath, 'utf-8');
            console.log(`📏 File size: ${content.length} characters`);

            const parsed = JSON.parse(content);
            console.log(`✅ JSON parsed successfully`);
            console.log(`📊 Data type: ${typeof parsed}`);

            if (typeof parsed === 'object' && parsed !== null) {
                const keys = Object.keys(parsed);
                console.log(`🔑 Top-level keys: ${keys.join(', ')}`);
            }

            return parsed;
        } catch (error) {
            console.error(`❌ Error reading/parsing file:`, error);
            throw new Error(`Invalid JSON in ${filePath}: ${error}`);
        }
    }

    async generateTypesForFile(fileConfig) {
        const inputPath = path.join(this.config.dataDir, fileConfig.input);
        const outputPath = path.join(this.config.outputDir, fileConfig.output);

        console.log(`\n🔄 Processing: ${fileConfig.input} → ${fileConfig.output}`);
        console.log(`📍 Input path: ${inputPath}`);
        console.log(`📍 Output path: ${outputPath}`);

        // Check if input file exists
        try {
            await fs.access(inputPath);
            console.log(`✅ Input file exists`);
        } catch {
            console.error(`❌ Input file not found: ${inputPath}`);
            throw new Error(`Input file not found: ${inputPath}`);
        }

        // Parse and validate JSON
        const jsonData = await this.validateJsonFile(inputPath);

        // Generate TypeScript content
        console.log(`🔧 Generating TypeScript interface...`);
        const typeContent = this.generateTypeFile(
            jsonData,
            fileConfig.rootTypeName,
            fileConfig.input,
            fileConfig.moduleName
        );

        console.log(`📝 Generated content length: ${typeContent.length} characters`);
        console.log(`🏗️  Extracted ${this.extractedInterfaces.size} nested interfaces`);

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        console.log(`📁 Ensuring output directory: ${outputDir}`);
        await this.ensureDirectory(outputDir);

        // Write output file
        console.log(`💾 Writing file: ${outputPath}`);
        await fs.writeFile(outputPath, typeContent, 'utf-8');

        console.log(`✅ Generated: ${outputPath}`);

        // Show preview
        const lines = typeContent.split('\n');
        const preview = lines.slice(0, 20).join('\n');
        console.log(`\n📄 Preview:\n${preview}${lines.length > 20 ? '\n...' : ''}`);
    }

    async generateAll() {
        console.log('🚀 Starting TypeScript type generation...\n');

        // Debug: List files in data directory
        try {
            const dataFiles = await fs.readdir(this.config.dataDir);
            console.log(`📂 Files in data directory: ${dataFiles.join(', ')}`);
        } catch (error) {
            console.error(`❌ Cannot read data directory:`, error);
            return;
        }

        const startTime = Date.now();
        let successCount = 0;
        let errorCount = 0;

        for (const fileConfig of this.config.files) {
            try {
                await this.generateTypesForFile(fileConfig);
                successCount++;
            } catch (error) {
                console.error(`❌ Error processing ${fileConfig.input}:`, error);
                errorCount++;
            }
        }

        const duration = Date.now() - startTime;

        console.log(`\n📊 Generation complete:`);
        console.log(`   ✅ Success: ${successCount}`);
        console.log(`   ❌ Errors: ${errorCount}`);
        console.log(`   ⏱️  Duration: ${duration}ms`);

        if (errorCount > 0) {
            process.exit(1);
        }
    }

    // Method to add more files programmatically
    addFile(config) {
        this.config.files.push(config);
    }
}

// Main execution function
async function main() {
    try {
        console.log('🎯 JavaScript Type Generator Starting...\n');

        const generator = new TypeGenerator();

        // You can add more files here if needed
        // generator.addFile({
        //   input: 'userData.json',
        //   output: 'users/types/user.types.ts',
        //   rootTypeName: 'UserData',
        //   moduleName: 'users'
        // });

        await generator.generateAll();

        console.log('\n🎉 All done! Types generated successfully!');
    } catch (error) {
        console.error('💥 Fatal error:', error);
        process.exit(1);
    }
}

// Execute the main function
main();