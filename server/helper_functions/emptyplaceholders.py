import os
import shutil

def empty_placeholder_directories(root_dir):
    for subdir, dirs, files in os.walk(root_dir):
        # Check if the current directory is a 'placeholders' subdirectory
        if os.path.basename(subdir) == 'placeholders':
            for file in files:
                # Construct the file path
                file_path = os.path.join(subdir, file)
                # Remove the file
                os.remove(file_path)
                print(f'Removed {file_path}')

# Usage
root_dir = '../client/public/assets/images/'
empty_placeholder_directories(root_dir)
