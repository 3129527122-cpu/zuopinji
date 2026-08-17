from pathlib import Path

from PIL import Image


ROOT = Path(__file__).parent / "public" / "work"
SOURCE_EXTENSIONS = {".jpg", ".jpeg", ".png"}


def main() -> None:
    sources = sorted(
        path for path in ROOT.rglob("*") if path.suffix.lower() in SOURCE_EXTENSIONS
    )
    source_bytes = sum(path.stat().st_size for path in sources)
    outputs: list[Path] = []

    for source in sources:
        output = source.with_suffix(".webp")
        with Image.open(source) as image:
            has_alpha = "A" in image.getbands() or "transparency" in image.info
            converted = image.convert("RGBA" if has_alpha else "RGB")
            options = {"quality": 80, "method": 6}
            if has_alpha:
                options["exact"] = True
            converted.save(output, "WEBP", **options)
        outputs.append(output)

    output_bytes = sum(path.stat().st_size for path in outputs)
    reduction = (1 - output_bytes / source_bytes) * 100 if source_bytes else 0
    print(f"converted={len(outputs)}")
    print(f"source_mb={source_bytes / 1024 / 1024:.2f}")
    print(f"webp_mb={output_bytes / 1024 / 1024:.2f}")
    print(f"reduction={reduction:.1f}%")


if __name__ == "__main__":
    main()
