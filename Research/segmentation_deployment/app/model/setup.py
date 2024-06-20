import os
import subprocess

def setup():
    # Get the current directory and the root directory
    current_directory = os.getcwd()
    root = os.path.dirname(os.path.dirname(current_directory))

    # Navigate to the Apex directory
    apex_dir = os.path.join(root, "app/apex")
    os.chdir(apex_dir)

    # Install the package using pip
    subprocess.run([
        "pip", "install", "-v", "--disable-pip-version-check", 
        "--no-cache-dir", "--no-build-isolation", "./"
    ], check=True)

    # Change back to the root directory
    os.chdir(root)




if __name__ == "__main__":
    setup()