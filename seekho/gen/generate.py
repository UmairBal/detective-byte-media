"""Generate realistic story photos for Seekho Sitara Shorts on a CPU GitHub runner.
Realistic Vision 5.1 + LCM-LoRA (fast, few steps) at 512x768, then a light img2img pass at 768x1152 for detail."""
import argparse, json, os, time
import torch
from diffusers import (AutoencoderKL, LCMScheduler, StableDiffusionImg2ImgPipeline, StableDiffusionPipeline)

ap = argparse.ArgumentParser()
ap.add_argument("--shard", type=int, default=0)
ap.add_argument("--of", type=int, default=1)
ap.add_argument("--out", default="out")
ap.add_argument("--limit", type=int, default=0)
a = ap.parse_args()
torch.set_num_threads(os.cpu_count() or 4)

items = json.load(open(os.path.join(os.path.dirname(__file__), "prompts.json")))
items = [it for i, it in enumerate(items) if i % a.of == a.shard]
if a.limit:
    items = items[: a.limit]
os.makedirs(a.out, exist_ok=True)

vae = AutoencoderKL.from_pretrained("stabilityai/sd-vae-ft-mse", torch_dtype=torch.float32)
pipe = StableDiffusionPipeline.from_pretrained("SG161222/Realistic_Vision_V5.1_noVAE", vae=vae,
                                               torch_dtype=torch.float32, safety_checker=None, requires_safety_checker=False)
pipe.scheduler = LCMScheduler.from_config(pipe.scheduler.config)
pipe.load_lora_weights("latent-consistency/lcm-lora-sdv1-5")
pipe.fuse_lora()
pipe.set_progress_bar_config(disable=True)
up = StableDiffusionImg2ImgPipeline(**pipe.components)
up.set_progress_bar_config(disable=True)

NEG = ("cartoon, illustration, anime, painting, 3d render, deformed, distorted face, extra fingers, extra limbs, "
       "bad hands, blurry, text, watermark, logo, nsfw")

for it in items:
    for kind in ("problem", "result"):
        path = os.path.join(a.out, f"{it['id']}_{kind}.jpg")
        if os.path.exists(path):
            continue
        t0 = time.time()
        g = torch.Generator().manual_seed(it["seed"])
        img = pipe(it[kind], negative_prompt=NEG, width=512, height=768, num_inference_steps=7,
                   guidance_scale=1.5, generator=g).images[0]
        img = img.resize((768, 1152))
        img = up(it[kind], image=img, negative_prompt=NEG, strength=0.4, num_inference_steps=8,
                 guidance_scale=1.5, generator=torch.Generator().manual_seed(it["seed"])).images[0]
        img.save(path, quality=92)
        print(f"{path} {time.time() - t0:.0f}s", flush=True)
