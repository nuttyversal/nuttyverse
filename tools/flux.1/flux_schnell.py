import torch
from diffusers import FluxPipeline
import diffusers

_flux_rope = diffusers.models.transformers.transformer_flux.rope

# Modify the rope function to handle MPS device.
def new_flux_rope(pos: torch.Tensor, dim: int, theta: int) -> torch.Tensor:
	assert dim % 2 == 0, "The dimension must be even."
	if pos.device.type == "mps":
		return _flux_rope(pos.to("cpu"), dim, theta).to(device=pos.device)
	else:
		return _flux_rope(pos, dim, theta)

diffusers.models.transformers.transformer_flux.rope = new_flux_rope

# Load the Flux Schnell model.
pipe = FluxPipeline.from_pretrained(
	"black-forest-labs/FLUX.1-schnell",
	revision='refs/pr/1',
	torch_dtype=torch.bfloat16
).to("mps")

# Define the prompt.
prompt = '''
	A headshot of a male anime chibi with black hair wearing glasses, playing the violin.
	The image is decorated with 4 pointed stars. Has a black aesthetic.
'''

for i in range(1, 9):
	# Generate the image.
	out = pipe(
		prompt=prompt,
		guidance_scale=0.,
		height=1024,
		width=1024,
		num_inference_steps=4,
		max_sequence_length=256,
	).images[0]

	# Save the generated image
	out.save(f"flux_image{i}.png")

# # Generate the image.
# out = pipe(
# 	prompt=prompt,
# 	guidance_scale=0.,
# 	height=1024,
# 	width=1024,
# 	num_inference_steps=4,
# 	max_sequence_length=256,
# ).images[0]
#
# # Save the generated image
# out.save("flux_image2.png")
