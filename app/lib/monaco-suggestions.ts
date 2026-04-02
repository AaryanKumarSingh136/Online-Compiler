import type * as Monaco from "monaco-editor";

type MonacoInstance = typeof Monaco;

type SuggestionTemplate = Omit<Monaco.languages.CompletionItem, "range">;

function createSuggestionRange(
  model: Monaco.editor.ITextModel,
  position: Monaco.Position
) {
  const word = model.getWordUntilPosition(position);

  return {
    startLineNumber: position.lineNumber,
    endLineNumber: position.lineNumber,
    startColumn: word.startColumn,
    endColumn: word.endColumn,
  };
}

const pythonSuggestions: SuggestionTemplate[] = [
  // Control Flow
  {
    label: "if __name__ == '__main__'",
    kind: 15,
    insertText: "if __name__ == '__main__':\n    ${1:main()}\n",
    insertTextRules: 4,
    detail: "Python entry point",
  },
  {
    label: "if statement",
    kind: 15,
    insertText: "if ${1:condition}:\n    ${2:pass}\n",
    insertTextRules: 4,
    detail: "If block",
  },
  {
    label: "if/else",
    kind: 15,
    insertText: "if ${1:condition}:\n    ${2:pass}\nelse:\n    ${3:pass}\n",
    insertTextRules: 4,
    detail: "If/else block",
  },
  {
    label: "if/elif/else",
    kind: 15,
    insertText: "if ${1:condition}:\n    ${2:pass}\nelif ${3:condition}:\n    ${4:pass}\nelse:\n    ${5:pass}\n",
    insertTextRules: 4,
    detail: "If/elif/else block",
  },
  {
    label: "for loop",
    kind: 15,
    insertText: "for ${1:item} in ${2:iterable}:\n    ${3:pass}\n",
    insertTextRules: 4,
    detail: "For loop",
  },
  {
    label: "for range",
    kind: 15,
    insertText: "for ${1:i} in range(${2:10}):\n    ${3:pass}\n",
    insertTextRules: 4,
    detail: "For loop with range",
  },
  {
    label: "while loop",
    kind: 15,
    insertText: "while ${1:condition}:\n    ${2:pass}\n",
    insertTextRules: 4,
    detail: "While loop",
  },
  {
    label: "try/except",
    kind: 15,
    insertText: "try:\n    ${1:pass}\nexcept ${2:Exception}:\n    ${3:pass}\n",
    insertTextRules: 4,
    detail: "Try/except block",
  },
  {
    label: "try/except/finally",
    kind: 15,
    insertText: "try:\n    ${1:pass}\nexcept ${2:Exception}:\n    ${3:pass}\nfinally:\n    ${4:pass}\n",
    insertTextRules: 4,
    detail: "Try/except/finally block",
  },

  // Functions
  {
    label: "def function",
    kind: 15,
    insertText: "def ${1:name}(${2:args}):\n    ${3:pass}\n",
    insertTextRules: 4,
    detail: "Define a function",
  },
  {
    label: "def with return",
    kind: 15,
    insertText: "def ${1:name}(${2:args}):\n    ${3:pass}\n    return ${4:value}\n",
    insertTextRules: 4,
    detail: "Function with return",
  },
  {
    label: "def with docstring",
    kind: 15,
    insertText: "def ${1:name}(${2:args}):\n    \"\"\"${3:docstring}\"\"\"\n    ${4:pass}\n",
    insertTextRules: 4,
    detail: "Function with docstring",
  },

  // Classes
  {
    label: "class",
    kind: 15,
    insertText: "class ${1:ClassName}:\n    def __init__(self, ${2:args}):\n        ${3:pass}\n",
    insertTextRules: 4,
    detail: "Python class",
  },
  {
    label: "class with methods",
    kind: 15,
    insertText: "class ${1:ClassName}:\n    def __init__(self):\n        ${2:pass}\n\n    def ${3:method}(self):\n        ${4:pass}\n",
    insertTextRules: 4,
    detail: "Class with methods",
  },

  // Data Structures
  {
    label: "list",
    kind: 6, // List
    insertText: "[${1:items}]",
    insertTextRules: 4,
    detail: "Python list",
  },
  {
    label: "dict",
    kind: 6,
    insertText: "{${1:key}: ${2:value}}",
    insertTextRules: 4,
    detail: "Python dictionary",
  },
  {
    label: "set",
    kind: 6,
    insertText: "{${1:items}}",
    insertTextRules: 4,
    detail: "Python set",
  },
  {
    label: "tuple",
    kind: 6,
    insertText: "(${1:items})",
    insertTextRules: 4,
    detail: "Python tuple",
  },

  // Built-in Functions
  {
    label: "print",
    kind: 1,
    insertText: "print(${1:value})",
    insertTextRules: 4,
    detail: "Print output",
  },
  {
    label: "len",
    kind: 1,
    insertText: "len(${1:obj})",
    insertTextRules: 4,
    detail: "Get length",
  },
  {
    label: "range",
    kind: 1,
    insertText: "range(${1:start}, ${2:stop})",
    insertTextRules: 4,
    detail: "Range sequence",
  },
  {
    label: "enumerate",
    kind: 1,
    insertText: "enumerate(${1:iterable})",
    insertTextRules: 4,
    detail: "Enumerate with index",
  },
  {
    label: "zip",
    kind: 1,
    insertText: "zip(${1:iter1}, ${2:iter2})",
    insertTextRules: 4,
    detail: "Zip iterables",
  },
  {
    label: "map",
    kind: 1,
    insertText: "map(${1:function}, ${2:iterable})",
    insertTextRules: 4,
    detail: "Map function",
  },
  {
    label: "filter",
    kind: 1,
    insertText: "filter(${1:function}, ${2:iterable})",
    insertTextRules: 4,
    detail: "Filter iterable",
  },
  {
    label: "sum",
    kind: 1,
    insertText: "sum(${1:iterable})",
    insertTextRules: 4,
    detail: "Sum values",
  },
  {
    label: "min",
    kind: 1,
    insertText: "min(${1:values})",
    insertTextRules: 4,
    detail: "Minimum value",
  },
  {
    label: "max",
    kind: 1,
    insertText: "max(${1:values})",
    insertTextRules: 4,
    detail: "Maximum value",
  },
  {
    label: "sorted",
    kind: 1,
    insertText: "sorted(${1:iterable})",
    insertTextRules: 4,
    detail: "Sort iterable",
  },
  {
    label: "isinstance",
    kind: 1,
    insertText: "isinstance(${1:obj}, ${2:type})",
    insertTextRules: 4,
    detail: "Check type",
  },
  {
    label: "type",
    kind: 1,
    insertText: "type(${1:obj})",
    insertTextRules: 4,
    detail: "Get type",
  },

  // List Methods
  {
    label: "append",
    kind: 2, // Method
    insertText: ".append(${1:item})",
    insertTextRules: 4,
    detail: "Add to list",
  },
  {
    label: "extend",
    kind: 2,
    insertText: ".extend(${1:iterable})",
    insertTextRules: 4,
    detail: "Extend list",
  },
  {
    label: "insert",
    kind: 2,
    insertText: ".insert(${1:index}, ${2:item})",
    insertTextRules: 4,
    detail: "Insert at index",
  },
  {
    label: "remove",
    kind: 2,
    insertText: ".remove(${1:item})",
    insertTextRules: 4,
    detail: "Remove item",
  },
  {
    label: "pop",
    kind: 2,
    insertText: ".pop(${1:index})",
    insertTextRules: 4,
    detail: "Pop item",
  },
  {
    label: "clear",
    kind: 2,
    insertText: ".clear()",
    insertTextRules: 4,
    detail: "Clear list",
  },
  {
    label: "sort",
    kind: 2,
    insertText: ".sort()",
    insertTextRules: 4,
    detail: "Sort in place",
  },
  {
    label: "reverse",
    kind: 2,
    insertText: ".reverse()",
    insertTextRules: 4,
    detail: "Reverse list",
  },

  // String Methods
  {
    label: "split",
    kind: 2,
    insertText: ".split(${1:sep})",
    insertTextRules: 4,
    detail: "Split string",
  },
  {
    label: "join",
    kind: 2,
    insertText: ".join(${1:iterable})",
    insertTextRules: 4,
    detail: "Join strings",
  },
  {
    label: "replace",
    kind: 2,
    insertText: ".replace(${1:old}, ${2:new})",
    insertTextRules: 4,
    detail: "Replace substring",
  },
  {
    label: "strip",
    kind: 2,
    insertText: ".strip()",
    insertTextRules: 4,
    detail: "Strip whitespace",
  },
  {
    label: "upper",
    kind: 2,
    insertText: ".upper()",
    insertTextRules: 4,
    detail: "Convert to uppercase",
  },
  {
    label: "lower",
    kind: 2,
    insertText: ".lower()",
    insertTextRules: 4,
    detail: "Convert to lowercase",
  },
  {
    label: "startswith",
    kind: 2,
    insertText: ".startswith(${1:prefix})",
    insertTextRules: 4,
    detail: "Check prefix",
  },
  {
    label: "endswith",
    kind: 2,
    insertText: ".endswith(${1:suffix})",
    insertTextRules: 4,
    detail: "Check suffix",
  },
  {
    label: "find",
    kind: 2,
    insertText: ".find(${1:sub})",
    insertTextRules: 4,
    detail: "Find substring",
  },
  {
    label: "count",
    kind: 2,
    insertText: ".count(${1:item})",
    insertTextRules: 4,
    detail: "Count occurrences",
  },

  // List Comprehension
  {
    label: "list comprehension",
    kind: 15,
    insertText: "[${1:expr} for ${2:item} in ${3:iterable}]",
    insertTextRules: 4,
    detail: "List comprehension",
  },
  {
    label: "dict comprehension",
    kind: 15,
    insertText: "{${1:key}: ${2:value} for ${3:item} in ${4:iterable}}",
    insertTextRules: 4,
    detail: "Dict comprehension",
  },
  {
    label: "set comprehension",
    kind: 15,
    insertText: "{${1:expr} for ${2:item} in ${3:iterable}}",
    insertTextRules: 4,
    detail: "Set comprehension",
  },

  // String Formatting
  {
    label: "f-string",
    kind: 15,
    insertText: "f\"${1:text} {${2:variable}}\"",
    insertTextRules: 4,
    detail: "F-string formatting",
  },
  {
    label: "format",
    kind: 2,
    insertText: ".format(${1:args})",
    insertTextRules: 4,
    detail: "String format",
  },

  // Import statements
  {
    label: "import",
    kind: 17, // Keyword
    insertText: "import ${1:module}",
    insertTextRules: 4,
    detail: "Import module",
  },
  {
    label: "from import",
    kind: 17,
    insertText: "from ${1:module} import ${2:name}",
    insertTextRules: 4,
    detail: "Import from module",
  },

  // Lambda
  {
    label: "lambda",
    kind: 15,
    insertText: "lambda ${1:args}: ${2:expr}",
    insertTextRules: 4,
    detail: "Lambda function",
  },

  // Context Manager
  {
    label: "with statement",
    kind: 15,
    insertText: "with ${1:context} as ${2:var}:\n    ${3:pass}\n",
    insertTextRules: 4,
    detail: "Context manager",
  },

  // Generator
  {
    label: "yield",
    kind: 17,
    insertText: "yield ${1:value}",
    insertTextRules: 4,
    detail: "Generator yield",
  },
];

const cSuggestions: SuggestionTemplate[] = [
  // Main Entry Point
  {
    label: "main",
    kind: 15,
    insertText: "#include <stdio.h>\n\nint main(void) {\n    ${1:// code}\n    return 0;\n}\n",
    insertTextRules: 4,
    detail: "C program entry",
  },
  {
    label: "main with args",
    kind: 15,
    insertText: "#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n    ${1:// code}\n    return 0;\n}\n",
    insertTextRules: 4,
    detail: "Main with arguments",
  },

  // Includes
  {
    label: "#include <stdio.h>",
    kind: 17,
    insertText: "#include <stdio.h>",
    insertTextRules: 4,
    detail: "Standard IO",
  },
  {
    label: "#include <stdlib.h>",
    kind: 17,
    insertText: "#include <stdlib.h>",
    insertTextRules: 4,
    detail: "Standard library",
  },
  {
    label: "#include <string.h>",
    kind: 17,
    insertText: "#include <string.h>",
    insertTextRules: 4,
    detail: "String functions",
  },
  {
    label: "#include <math.h>",
    kind: 17,
    insertText: "#include <math.h>",
    insertTextRules: 4,
    detail: "Math functions",
  },
  {
    label: "#include <time.h>",
    kind: 17,
    insertText: "#include <time.h>",
    insertTextRules: 4,
    detail: "Time functions",
  },

  // Control Flow
  {
    label: "if statement",
    kind: 15,
    insertText: "if (${1:condition}) {\n    ${2:// code}\n}\n",
    insertTextRules: 4,
    detail: "If block",
  },
  {
    label: "if/else",
    kind: 15,
    insertText: "if (${1:condition}) {\n    ${2:// true}\n} else {\n    ${3:// false}\n}\n",
    insertTextRules: 4,
    detail: "If/else",
  },
  {
    label: "if/else if/else",
    kind: 15,
    insertText: "if (${1:condition}) {\n    ${2:// code}\n} else if (${3:condition}) {\n    ${4:// code}\n} else {\n    ${5:// code}\n}\n",
    insertTextRules: 4,
    detail: "If/else if/else",
  },
  {
    label: "for loop",
    kind: 15,
    insertText: "for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n    ${3:// code}\n}\n",
    insertTextRules: 4,
    detail: "For loop",
  },
  {
    label: "while loop",
    kind: 15,
    insertText: "while (${1:condition}) {\n    ${2:// code}\n}\n",
    insertTextRules: 4,
    detail: "While loop",
  },
  {
    label: "do while",
    kind: 15,
    insertText: "do {\n    ${1:// code}\n} while (${2:condition});\n",
    insertTextRules: 4,
    detail: "Do-while loop",
  },
  {
    label: "switch/case",
    kind: 15,
    insertText: "switch (${1:expr}) {\n    case ${2:value}:\n        ${3:// code}\n        break;\n    default:\n        ${4:// code}\n}\n",
    insertTextRules: 4,
    detail: "Switch statement",
  },

  // Functions
  {
    label: "function",
    kind: 15,
    insertText: "${1:void} ${2:name}(${3:args}) {\n    ${4:// code}\n}\n",
    insertTextRules: 4,
    detail: "Define function",
  },
  {
    label: "function with return",
    kind: 15,
    insertText: "${1:int} ${2:name}(${3:args}) {\n    ${4:// code}\n    return ${5:value};\n}\n",
    insertTextRules: 4,
    detail: "Function with return",
  },

  // Data Types
  {
    label: "int variable",
    kind: 5, // Variable
    insertText: "int ${1:name}",
    insertTextRules: 4,
    detail: "Integer variable",
  },
  {
    label: "float variable",
    kind: 5,
    insertText: "float ${1:name}",
    insertTextRules: 4,
    detail: "Float variable",
  },
  {
    label: "char variable",
    kind: 5,
    insertText: "char ${1:name}",
    insertTextRules: 4,
    detail: "Character variable",
  },
  {
    label: "double variable",
    kind: 5,
    insertText: "double ${1:name}",
    insertTextRules: 4,
    detail: "Double variable",
  },
  {
    label: "long variable",
    kind: 5,
    insertText: "long ${1:name}",
    insertTextRules: 4,
    detail: "Long variable",
  },
  {
    label: "pointer",
    kind: 5,
    insertText: "${1:int} *${2:ptr}",
    insertTextRules: 4,
    detail: "Pointer declaration",
  },
  {
    label: "array",
    kind: 5,
    insertText: "${1:int} ${2:arr}[${3:size}]",
    insertTextRules: 4,
    detail: "Array declaration",
  },

  // Struct
  {
    label: "struct",
    kind: 15,
    insertText: "struct ${1:Name} {\n    ${2:int} ${3:field};\n};\n",
    insertTextRules: 4,
    detail: "Structure",
  },
  {
    label: "typedef struct",
    kind: 15,
    insertText: "typedef struct {\n    ${1:int} ${2:field};\n} ${3:Name};\n",
    insertTextRules: 4,
    detail: "Typedef struct",
  },

  // Enum
  {
    label: "enum",
    kind: 15,
    insertText: "enum ${1:Name} {\n    ${2:VALUE1},\n    ${3:VALUE2}\n};\n",
    insertTextRules: 4,
    detail: "Enumeration",
  },

  // Memory Management
  {
    label: "malloc",
    kind: 1,
    insertText: "malloc(${1:size})",
    insertTextRules: 4,
    detail: "Allocate memory",
  },
  {
    label: "calloc",
    kind: 1,
    insertText: "calloc(${1:count}, ${2:size})",
    insertTextRules: 4,
    detail: "Allocate zeroed memory",
  },
  {
    label: "realloc",
    kind: 1,
    insertText: "realloc(${1:ptr}, ${2:size})",
    insertTextRules: 4,
    detail: "Reallocate memory",
  },
  {
    label: "free",
    kind: 1,
    insertText: "free(${1:ptr})",
    insertTextRules: 4,
    detail: "Free memory",
  },

  // Input/Output
  {
    label: "printf",
    kind: 1,
    insertText: "printf(\"${1:%d}\\\\n\"${2:, args});",
    insertTextRules: 4,
    detail: "Print formatted",
  },
  {
    label: "scanf",
    kind: 1,
    insertText: "scanf(\"${1:%d}\", &${2:var});",
    insertTextRules: 4,
    detail: "Read input",
  },
  {
    label: "fprintf",
    kind: 1,
    insertText: "fprintf(${1:stream}, \"${2:%d}\\\\n\"${3:, args});",
    insertTextRules: 4,
    detail: "Print to file/stream",
  },
  {
    label: "fopen",
    kind: 1,
    insertText: "fopen(\"${1:filename}\", \"${2:r}\");",
    insertTextRules: 4,
    detail: "Open file",
  },
  {
    label: "fclose",
    kind: 1,
    insertText: "fclose(${1:fp});",
    insertTextRules: 4,
    detail: "Close file",
  },
  {
    label: "fgets",
    kind: 1,
    insertText: "fgets(${1:buffer}, ${2:size}, ${3:stream});",
    insertTextRules: 4,
    detail: "Read line from file",
  },
  {
    label: "fputs",
    kind: 1,
    insertText: "fputs(${1:string}, ${2:stream});",
    insertTextRules: 4,
    detail: "Write string to file",
  },

  // String Functions
  {
    label: "strlen",
    kind: 1,
    insertText: "strlen(${1:str})",
    insertTextRules: 4,
    detail: "String length",
  },
  {
    label: "strcmp",
    kind: 1,
    insertText: "strcmp(${1:str1}, ${2:str2})",
    insertTextRules: 4,
    detail: "Compare strings",
  },
  {
    label: "strcpy",
    kind: 1,
    insertText: "strcpy(${1:dest}, ${2:src});",
    insertTextRules: 4,
    detail: "Copy string",
  },
  {
    label: "strcat",
    kind: 1,
    insertText: "strcat(${1:dest}, ${2:src});",
    insertTextRules: 4,
    detail: "Concatenate strings",
  },
  {
    label: "strchr",
    kind: 1,
    insertText: "strchr(${1:str}, ${2:char})",
    insertTextRules: 4,
    detail: "Find character",
  },
  {
    label: "strstr",
    kind: 1,
    insertText: "strstr(${1:str}, ${2:substr})",
    insertTextRules: 4,
    detail: "Find substring",
  },

  // Math Functions
  {
    label: "sqrt",
    kind: 1,
    insertText: "sqrt(${1:x})",
    insertTextRules: 4,
    detail: "Square root",
  },
  {
    label: "pow",
    kind: 1,
    insertText: "pow(${1:base}, ${2:exp})",
    insertTextRules: 4,
    detail: "Power function",
  },
  {
    label: "abs",
    kind: 1,
    insertText: "abs(${1:x})",
    insertTextRules: 4,
    detail: "Absolute value",
  },
  {
    label: "sin",
    kind: 1,
    insertText: "sin(${1:x})",
    insertTextRules: 4,
    detail: "Sine function",
  },
  {
    label: "cos",
    kind: 1,
    insertText: "cos(${1:x})",
    insertTextRules: 4,
    detail: "Cosine function",
  },
  {
    label: "tan",
    kind: 1,
    insertText: "tan(${1:x})",
    insertTextRules: 4,
    detail: "Tangent function",
  },
  {
    label: "floor",
    kind: 1,
    insertText: "floor(${1:x})",
    insertTextRules: 4,
    detail: "Floor function",
  },
  {
    label: "ceil",
    kind: 1,
    insertText: "ceil(${1:x})",
    insertTextRules: 4,
    detail: "Ceiling function",
  },

  // Other Utility Functions
  {
    label: "rand",
    kind: 1,
    insertText: "rand()",
    insertTextRules: 4,
    detail: "Random number",
  },
  {
    label: "srand",
    kind: 1,
    insertText: "srand(${1:seed});",
    insertTextRules: 4,
    detail: "Seed random",
  },
  {
    label: "exit",
    kind: 1,
    insertText: "exit(${1:0});",
    insertTextRules: 4,
    detail: "Exit program",
  },
  {
    label: "assert",
    kind: 1,
    insertText: "assert(${1:condition});",
    insertTextRules: 4,
    detail: "Assert condition",
  },
];

export function registerMonacoCompletionProviders(monacoInstance: MonacoInstance) {
  monacoInstance.languages.registerCompletionItemProvider("python", {
    triggerCharacters: [".", "_"],
    provideCompletionItems: (model, position) => ({
      suggestions: pythonSuggestions.map((suggestion) => ({
        ...suggestion,
        range: createSuggestionRange(model, position),
      })),
    }),
  });

  monacoInstance.languages.registerCompletionItemProvider("c", {
    triggerCharacters: ["#", ".", "_"],
    provideCompletionItems: (model, position) => ({
      suggestions: cSuggestions.map((suggestion) => ({
        ...suggestion,
        range: createSuggestionRange(model, position),
      })),
    }),
  });
}