import subprocess
import sys

# Function to decompile a binary using Boomerang
def decompile_with_boomerang(binary_file):
    try:
        # Run the Boomerang decompiler
        boomerang_command = ["./boomerang", binary_file]
        print(boomerang_command)
        result = subprocess.run(boomerang_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True, text=True)
        
        # The pseudo-C code is returned in stdout
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error running Boomerang: {e.stderr}")
        sys.exit(1)

# Main function to process the binary file
def decompile_binary(binary_file):
    # Decompile the binary file using Boomerang
    c_code = decompile_with_boomerang(binary_file)
    
    # Print the decompiled C code
    print(c_code)
    return c_code

# Entry point of the script
if __name__ == "__main__":
    # Ensure a binary file is provided as a command line argument
    if len(sys.argv) != 2:
        print("Usage: python decompiler.py <binary_file>")
        sys.exit(1)
    
    binary_file = sys.argv[1]
    
    # Decompile the binary file
    decompile_binary(binary_file)
