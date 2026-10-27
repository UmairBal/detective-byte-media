import json, os, subprocess, sys, time, traceback
subprocess.run([sys.executable, "-m", "pip", "install", "-q", "git+https://github.com/huggingface/diffusers", "transformers>=4.51", "accelerate", "safetensors", "sentencepiece"], check=False)
import torch, numpy as np
print("GPU:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else "none", flush=True)
STYLE = "flat 2D cartoon animation style like a modern kids TV show, clean bold outlines, bright flat colours, expressive faces, vertical frame, no text"
MOM = "a young South Asian mother in a mint green kameez"
GIRL = "her only child, a 4 year old daughter with two pigtails and a pink t-shirt"
P = [
 ("demo_problem", f"{STYLE}, exactly two characters: {MOM} kneeling next to {GIRL}; the girl looks bored and frowning, pushing away alphabet flashcards on the floor of a cozy living room"),
 ("demo_trick", f"{STYLE}, exactly two characters: {MOM} smiling and holding up a big card with the letter B, and {GIRL} looking at the card curious and surprised, cozy living room"),
 ("demo_result", f"{STYLE}, exactly two characters: {GIRL} laughing happily and pointing at a big letter B on a cereal box at the kitchen table, and {MOM} smiling proudly beside her, bright kitchen"),
 ("demo_cheer", f"{STYLE}, close-up of a happy 4 year old South Asian girl with two pigtails and a pink t-shirt cheering with both arms up, big smile, sparkles, soft yellow background"),
]
os.makedirs("/kaggle/working/out", exist_ok=True)
pipe, mode = None, None
for dt in (torch.bfloat16, torch.float16):
    try:
        from diffusers import ZImagePipeline
        pipe = ZImagePipeline.from_pretrained("Tongyi-MAI/Z-Image-Turbo", torch_dtype=dt)
        pipe.enable_model_cpu_offload()
        img = pipe(prompt=P[0][1], height=1024, width=576, num_inference_steps=9, guidance_scale=0.0,
                   generator=torch.Generator("cuda").manual_seed(7)).images[0]
        if np.array(img).mean() < 5:
            raise RuntimeError("black image")
        mode = f"zimage-{dt}"
        break
    except Exception:
        traceback.print_exc(); pipe = None
if pipe is None:
    from diffusers import StableDiffusionXLPipeline
    pipe = StableDiffusionXLPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, variant="fp16").to("cuda")
    mode = "sdxl"
print("MODE:", mode, flush=True)
for name, prompt in P:
    t0 = time.time()
    for k, seed in enumerate((77, 91)):
        g = torch.Generator("cuda").manual_seed(seed)
        if mode.startswith("zimage"):
            img = pipe(prompt=prompt, height=1536, width=864, num_inference_steps=9, guidance_scale=0.0, generator=g).images[0]
        else:
            img = pipe(prompt, negative_prompt="realistic, photo, 3d, extra people, text, watermark", width=832, height=1472, num_inference_steps=28, guidance_scale=6, generator=g).images[0]
        img.save(f"/kaggle/working/out/{name}_v{k}.jpg", quality=93)
    print(name, f"{time.time()-t0:.1f}s", flush=True)
print("ALL_DONE", mode)
# run 1793133219
