import { readFileSync } from "node:fs";
import { basename } from "node:path";

const filePath = process.argv[2];

if (!filePath) {
  throw new Error("Usage: npm run validate <file_path>");
}

const source = readFileSync(filePath, "utf8");
const componentName = basename(filePath).replace(/\.(tsx|ts)$/, "");
const expectedInterface = `${componentName}Props`;

if (!source.includes(`interface ${expectedInterface}`)) {
  throw new Error(`${filePath} is missing ${expectedInterface}`);
}

if (/href="#"/.test(source)) {
  throw new Error(`${filePath} contains an unresolved href="#" link`);
}

if (/#[0-9a-fA-F]{3,8}/.test(source)) {
  throw new Error(`${filePath} contains a hardcoded hex color`);
}

console.log(`${filePath} passed component validation`);
