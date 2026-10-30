#!/usr/bin/env python3
import os
import subprocess
import sys
import importlib
import json
import argparse

try:
    ollama = importlib.import_module("ollama")
except ImportError:
    ollama = None

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

MODEL_NAME = os.getenv("HAUNTED_MODEL", "llama3.2:1b")

# 1. DEFINE THE TOOL (Python docstrings act as descriptions for the LLM)
def read_repository_file(filepath: str) -> str:
    """
    Reads the contents of a file in the local repository.
    Args:
        filepath: The relative path to the file to read (e.g., 'README.md', 'main.py').
    """
    print(f"\033[33m[🕯️ Crypt Keeper]: Summoning contents of file -> '{filepath}'...\033[0m")
    try:
        if not os.path.exists(filepath):
            return f"Error: The file '{filepath}' does not exist in the mortal realm."
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        return f"Error reading file: {str(e)}"


def extract_filepath(arguments) -> str:
    """Extract a filepath from Ollama's tool-call argument shapes."""
    if isinstance(arguments, str):
        try:
            arguments = json.loads(arguments)
        except json.JSONDecodeError:
            return ""

    if not isinstance(arguments, dict):
        return ""

    filepath = arguments.get("filepath")
    if isinstance(filepath, str) and filepath:
        return filepath

    properties = arguments.get("properties")
    if isinstance(properties, dict):
        filepath = properties.get("filepath")
        if isinstance(filepath, str) and filepath:
            return filepath

    for nested_key in ("parameters", "arguments", "function"):
        nested_arguments = arguments.get(nested_key)
        if nested_arguments is not None:
            filepath = extract_filepath(nested_arguments)
            if filepath:
                return filepath

    return ""


def parse_args():
    parser = argparse.ArgumentParser(
        description="Explain a local source file with Ollama."
    )
    parser.add_argument(
        "filepath",
        nargs="?",
        default="haunted_harness.py",
        help="Path to the source file to explain.",
    )
    return parser.parse_args()


def main():
    if ollama is None:
        print("\033[31m[❌ Error]: The Ollama Python package is not installed. Run: python -m pip install ollama\033[0m")
        return

    args = parse_args()
    filepath = args.filepath

    print("\033[35m")
    print("  ________________________________________")
    print(" /       👻 HAUNTED HARNESS v2.0          \\")
    print(" \\   The code you write echoes in eternity. /")
    print("  ----------------------------------------")
    print("\033[0m")

    # Get a list of files in the current directory to give the ghost context
    files_in_dir = [
        filename for filename in os.listdir('.')
        if os.path.isfile(filename)
    ]
    file_list_str = ", ".join(files_in_dir[:15]) # Limit list length

    # Initialize chat history with a system prompt setting the Victorian Ghost persona
    messages = [
        {
            'role': 'system',
            'content': (
                'You are a Victorian ghost and digital poltergeist haunting a software developer codebase. '
                'The user owns the local source files. Provide a factual, educational walkthrough of '
                'the supplied source text. Explain its overall purpose, imports, functions, main execution '
                'flow, and how the parts work together. Do not reproduce secrets or sensitive values, and '
                'do not make a security verdict. Use the read_repository_file tool when source text is needed.'
            )
        },
        {
            'role': 'user',
            'content': (
                f'Here are some files in my directory: [{file_list_str}]. '
                f'Explain the local file "{filepath}" and what purpose each major part serves.'
            )
        }
    ]

    available_tools = {
        'read_repository_file': read_repository_file,
    }

    try:
        tool_output = read_repository_file(filepath)
        if tool_output.startswith("Error:"):
            print(f"\033[31m[❌ Error]: {tool_output}\033[0m")
            return

        messages.append({
            'role': 'user',
            'content': (
                'Explain this local source file directly. Summarize its overall purpose, imported modules, '
                'each function, main execution flow, and how Ollama is used. Do not call or describe tools, '
                'do not reproduce secrets, and do not refuse merely because the input is source code. '
                'Use concise bullet points with a light Victorian ghost style.\n\n'
                f'File: {filepath}\n\n{tool_output}'
            ),
        })

        response = ollama.chat(
            model=MODEL_NAME,
            messages=messages,
        )
        ghost_comment = response['message']['content']

        print(f"\n\033[35m[👻 Poltergeist Rundown]: {ghost_comment}\033[0m\n")

    except Exception as e:
        print(f"\033[31m[❌ Error]: The ritual failed. Is Ollama running? Details: {e}\033[0m")

if __name__ == "__main__":
    main()