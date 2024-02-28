

export const loadImagesFromFolder = async (folderName) => {

    //static setup (images in public folder; no imports needed)
    const basePath = `/assets/images/${folderName}`;
    const imageNames = ['base_color.png', 'normal.png', 'height.png', 'smoothness.png'];
    const images = imageNames.map(name => `${basePath}/${folderName}_${name}`);

    return images;
}