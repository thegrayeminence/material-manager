// // MaterialUploadForm.jsx

// ... existing imports and setup ...

const handleFormSubmission = async (data) => {
    setIsLoading(true); // Start loading indicator
    clearGeneratedImages(); // Clear previously loaded images

    try {
        const materialData = {...formData.materialData, ...data};
        const textureResponse = await axios.post('http://localhost:3001/api/generate_albedo', {materialData});
        console.log("Texture generation initiated!");
        const materialId = textureResponse.data.material_id;
        const baseColorUrl = textureResponse.data.image_url;

        // Add base color image to the store and navigate to the loading page
        addGeneratedImage(baseColorUrl);
        navigate('/loading-textures', {state: {materialId, baseColorUrl}});

        // Second API call to generate PBR maps
        const pbrResponse = await axios.post('http://localhost:3001/api/generate_pbr_maps', {base_color_url: baseColorUrl, material_id: materialId});
        console.log("PBR maps generation initiated!");

        // Add PBR maps to the store
        addGeneratedImage(pbrResponse.data.normal_map_url);
        addGeneratedImage(pbrResponse.data.height_map_url);
        addGeneratedImage(pbrResponse.data.smoothness_map_url);

        // Optionally, update the setGeneratedImages if you need all images together
        // setGeneratedImages(prevImages => [...prevImages, baseColorUrl, ...Object.values(pbrResponse.data)]);
        setIsLoading(false); // End loading indicator
    } catch (error) {
        console.error("Error during form submission:", error);
        setIsLoading(false); // Reset loading state in case of error
    }
};