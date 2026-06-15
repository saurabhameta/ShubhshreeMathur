import os

def delete_all_webps(root_folder):
    deleted_files = 0
    for root, dirs, files in os.walk(root_folder):
        for file in files:
            if file.lower().endswith('.webp'):
                file_path = os.path.join(root, file)
                try:
                    os.remove(file_path)
                    print(f"🗑️ Deleted: {file_path}")
                    deleted_files += 1
                except Exception as e:
                    print(f"❌ Failed to delete {file_path}: {e}")
    print(f"\n✅ Total WebP files deleted: {deleted_files}")

# Example usage
delete_all_webps("/Users/sameta/shubhshree-portfolio")  # Replace with your actual folder path
