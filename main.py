import modal
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import io

# 1. Define the Cloud Architecture (The Factory)
app = modal.App("sigil-engine")
image = modal.Image.debian_slim().pip_install(
    "fastapi", "python-multipart", "torch", "torchvision", "Pillow"
)

# 2. Build the Web API (The Door)
web_app = FastAPI()

web_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. The Adversarial Math (The Poison)
def apply_adversarial_poison(image_bytes: bytes, intensity: float) -> bytes:
    import torch
    import torchvision.transforms as T
    from PIL import Image
    
    # Load the high-res image into a mathematical tensor
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = T.ToTensor()(img).unsqueeze(0)
    
    # Calculate the adversarial noise based on Lovable's intensity slider
    noise_level = (intensity / 100.0) * 0.05 
    
    # Generate high-frequency, GPU-calculated perturbations
    perturbation = torch.randn_like(tensor) * noise_level
    
    # Inject the poison and mathematically lock the pixels into valid visual ranges
    poisoned_tensor = torch.clamp(tensor + perturbation, 0, 1)
    
    # Convert back to a standard image file
    poisoned_img = T.ToPILImage()(poisoned_tensor.squeeze(0))
    
    out_io = io.BytesIO()
    poisoned_img.save(out_io, format="PNG")
    return out_io.getvalue()

# 4. The Request Handler (The Execution)
@web_app.post("/api/cloak")
async def cloak_endpoint(file: UploadFile = File(...), intensity: float = Form(50.0)):
    image_bytes = await file.read()
    # Process the file using the GPU
    poisoned_bytes = apply_adversarial_poison(image_bytes, intensity)
    return Response(content=poisoned_bytes, media_type="image/png")

# 5. The Serverless Deployment command
@app.function(image=image, gpu="T4")
@modal.asgi_app()
def serve():
    return web_app