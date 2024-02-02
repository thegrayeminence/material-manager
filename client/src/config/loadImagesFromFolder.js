

export const loadImagesFromFolder = async (folderName) => {
    //const parentFolderPath =  `../../public/assets/images/`;
    const images = [];
    const imageNames = ['base_color.png', 'normal.png', 'height.png', 'smoothness.png']
    for (let name of imageNames) {
        const imagePath = `../../public/assets/images/${folderName}/${folderName}_${name}`;
        const imageModule = await import(imagePath);
        images.push(imageModule.default);
    }

    return images;
}