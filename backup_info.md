# Image Backup Information

## Backup Created: August 23, 2025

- **Original assets folder**: 451MB
- **Backup location**: `assets_backup/`
- **Purpose**: Preserve original high-quality images before compression

## What's backed up:
- All book illustrations
- Editorial artwork  
- Narrative images
- Profile photos
- All original .webp files

## To restore originals:
```bash
# If you ever need to restore the original images:
rm -rf assets
cp -r assets_backup assets
```

## Note:
- Keep `assets_backup` folder safe
- Don't delete it after compression
- Original quality preserved for future use
