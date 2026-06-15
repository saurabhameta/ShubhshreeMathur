import os
import shutil

# Replace with the path to your root folder
root_folder = './'
jpeg_root = os.path.join(root_folder, 'JPEG_Images')
webp_root = os.path.join(root_folder, 'WEBP_Images')

# Create destination base folders
os.makedirs(jpeg_root, exist_ok=True)
os.makedirs(webp_root, exist_ok=True)

for dirpath, _, filenames in os.walk(root_folder):
    for filename in filenames:
        file_lower = filename.lower()
        source_path = os.path.join(dirpath, filename)

        # Skip files already in the destination folders
        if jpeg_root in source_path or webp_root in source_path:
            continue

        relative_path = os.path.relpath(dirpath, root_folder)

        if file_lower.endswith(('.jpeg', '.jpg')):
            dest_dir = os.path.join(jpeg_root, relative_path)
        elif file_lower.endswith('.webp'):
            dest_dir = os.path.join(webp_root, relative_path)
        else:
            continue  # Skip non-target files

        os.makedirs(dest_dir, exist_ok=True)

        dest_path = os.path.join(dest_dir, filename)

        # Avoid overwriting files with the same name
        base, ext = os.path.splitext(filename)
        counter = 1
        while os.path.exists(dest_path):
            dest_path = os.path.join(dest_dir, f"{base}_{counter}{ext}")
            counter += 1

        shutil.move(source_path, dest_path)
        print(f"Moved: {source_path} -> {dest_path}")
