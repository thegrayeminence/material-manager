import os
import replicate
# export REPLICATE_API_TOKEN=r8_UG5Hm4swKAvk3K39YmcsMFqwuHlUELh3AAXCJ
replicate.api_token = os.getenv("REPLICATE_API_TOKEN")


def generate_image(prompt):

    # Specify the model to use
    model_name = "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478"
    
    #make the API call
    output = replicate.run(model_name, input={"prompt": prompt})
    print("Raw output from Replicate:", output, output[0])

    if isinstance(output, list) and len(output) > 0 and isinstance(output[0], str):
        return output[0]
    else:
        raise Exception(f"Failed to generate image: {output}")


# Example usage
prompt = "top-down image of rough solid flat dark, rich ((iron)) surface. interspersed with bright ((flecks)) of ((glinting)) metallic spots like mica. high quality photograph, detailed, realistic"
try:
    image_url = generate_image(prompt)
    print("Generated image URL:", image_url)
except Exception as e:
    print("Error:", e)
