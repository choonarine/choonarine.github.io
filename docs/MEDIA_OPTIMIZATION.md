# Image and Video Optimization Guide

## Using Images

### In Astro Components

Use the `OptimizedImage` component for automatic optimization:

```astro
---
import OptimizedImage from '../components/OptimizedImage.astro';
import myImage from '../assets/my-image.jpg';
---

<OptimizedImage
  src={myImage}
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
/>
```

### In MDX Posts

Use the standard Image component from Astro:

```mdx
---
import { Image } from 'astro:assets';
import heroImage from '../../assets/hero.jpg';
---

# My Post

<Image src={heroImage} alt="Hero image" />
```

### Remote Images

For remote images, specify dimensions:

```astro
<OptimizedImage
  src="https://example.com/image.jpg"
  alt="Remote image"
  width={800}
  height={600}
/>
```

## Using Videos

### Basic Video Usage

```astro
---
import OptimizedVideo from '../components/OptimizedVideo.astro';
---

<OptimizedVideo
  src="/videos/demo.mp4"
  poster="/videos/demo-poster.jpg"
  controls={true}
  preload="metadata"
/>
```

### Video Optimization Tips

1. **Use compressed formats**: Compress videos with tools like HandBrake or FFmpeg
2. **Provide a poster image**: Shows before the video loads
3. **Use preload="metadata"**: Only loads metadata, not the entire video
4. **Consider lazy loading**: Load videos only when they enter viewport

### FFmpeg Compression Example

```bash
# Compress video to reasonable size
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 1M output.mp4
```

## Image Storage

### Local Images

Store images in:
- `src/assets/` for imported images (optimized by Astro)
- `public/` for static images (not optimized)

### Best Practices

1. **Use src/assets/** for images that need optimization
2. **Use public/** for favicons, robots.txt, and images that shouldn't be processed
3. **Specify dimensions** to prevent layout shift
4. **Use lazy loading** for below-the-fold images
5. **Use WebP format** (automatic with OptimizedImage component)

## Image Formats

The OptimizedImage component automatically converts to WebP, which provides:
- 25-35% better compression than JPEG
- Support for transparency (like PNG)
- Broad browser support

## Performance Benefits

- **Automatic WebP conversion**: Smaller file sizes
- **Responsive images**: Different sizes for different devices
- **Lazy loading**: Images load only when needed
- **Sharp processing**: High-quality, fast image optimization
