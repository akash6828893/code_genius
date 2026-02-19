export const defaultCode = {
  javascript: `// JavaScript Hello World
console.log("Hello, World!");

// Basic function example
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("JavaScript"));`,

  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,

  csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,

  fsharp: `// F# Hello World
printfn "Hello, World!"

// Function example
let greet name =
    printfn "Hello, %s!" name

greet "F#"`,

  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,

  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,

  kotlin: `fun main() {
    println("Hello, World!")
}`,

  php: `<?php
echo "Hello, World!\\n";

// Function example
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("PHP");
?>`,

  python: `# Python Hello World
print("Hello, World!")

# Function example
def greet(name):
    return f"Hello, {name}!"

print(greet("Python"))`,

  r: `# R Hello World
print("Hello, World!")

# Function example
greet <- function(name) {
  paste("Hello,", name, "!")
}

print(greet("R"))`,

  ruby: `# Ruby Hello World
puts "Hello, World!"

# Function example
def greet(name)
  "Hello, #{name}!"
end

puts greet("Ruby")`,

  rust: `fn main() {
    println!("Hello, World!");
    
    let name = "Rust";
    println!("Hello, {}!", name);
}`,

  scala: `object Main extends App {
  println("Hello, World!")
  
  def greet(name: String): String = {
    s"Hello, $name!"
  }
  
  println(greet("Scala"))
}`,

  sql: `-- SQL Example
SELECT 'Hello, World!' AS message;

-- Create a simple table
CREATE TABLE IF NOT EXISTS greetings (
    id INTEGER PRIMARY KEY,
    message TEXT
);

INSERT INTO greetings (message) VALUES ('Hello, SQL!');

SELECT * FROM greetings;`,

  swift: `import Foundation

// Swift Hello World
print("Hello, World!")

// Function example
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

print(greet(name: "Swift"))`,

  typescript: `// TypeScript Hello World
console.log("Hello, World!");

// Function with type annotations
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("TypeScript"));`,
};

// Helper function to get default code by language value
export const getDefaultCode = (languageValue) => {
  return defaultCode[languageValue] || `// Start coding in ${languageValue}...\n`;
};
