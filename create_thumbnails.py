from PIL import Image
import os

def create_thumbnail(input_path, output_path, size):
    with Image.open(input_path) as img:
        # Calculate aspect ratio
        width, height = img.size
        ratio = width / height
        
        # Calculate new dimensions
        new_width = size
        new_height = int(size / ratio)
        
        # Resize image
        resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Save with WebP format and quality settings
        resized.save(output_path, 'WEBP', quality=85, method=6)

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.webp') and not file.endswith('_small.webp'):
                input_path = os.path.join(root, file)
                output_path = os.path.join(root, file.replace('.webp', '_small.webp'))
                
                # Skip if small version already exists
                if os.path.exists(output_path):
                    continue
                
                print(f"Processing {input_path}")
                try:
                    create_thumbnail(input_path, output_path, 600)
                    print(f"Created {output_path}")
                except Exception as e:
                    print(f"Error processing {input_path}: {e}")

if __name__ == "__main__":
    # Process all image directories
    image_dirs = [
        "assets/A song in Space",
        "assets/Aurko_s Museum Adventure",
        "assets/It started with a yawn",
        "assets/The art of falling",
        "assets/Kulfi",
        "assets/Chakmak",
        "assets/Mutthmaila",
        "assets/chik-chik",
        "assets/Listen to Appa",
        "assets/What house shall I build today",
        "assets/Billy the goat"
    ]
    
    for directory in image_dirs:
        if os.path.exists(directory):
            process_directory(directory)
        else:
            print(f"Directory not found: {directory}") 