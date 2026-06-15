# Performance Optimization Script
# This script compresses large webp images to improve website speed

import os
from PIL import Image

def compress_webp_images(directory, max_size_kb=300):
    """Compress webp images to reduce file size"""
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.webp'):
                file_path = os.path.join(root, file)
                file_size_kb = os.path.getsize(file_path) / 1024
                
                if file_size_kb > max_size_kb:
                    print(f"Compressing: {file_path} ({file_size_kb:.0f}KB)")
                    
                    # Open and compress
                    with Image.open(file_path) as img:
                        # Convert to RGB if necessary
                        if img.mode in ('RGBA', 'LA', 'P'):
                            img = img.convert('RGB')
                        
                        # Resize if too large (max 800px width)
                        if img.width > 800:
                            ratio = 800 / img.width
                            new_height = int(img.height * ratio)
                            img = img.resize((800, new_height), Image.Resampling.LANCZOS)
                        
                        # Save with compression
                        img.save(file_path, 'WEBP', quality=85, optimize=True)
                        
                        new_size_kb = os.path.getsize(file_path) / 1024
                        print(f"  → Compressed to {new_size_kb:.0f}KB")

if __name__ == "__main__":
    assets_dir = "assets"
    compress_webp_images(assets_dir)
    print("✅ Image compression complete!")
