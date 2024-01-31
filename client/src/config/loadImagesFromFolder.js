
//import path from '../assets/images/'
export const loadImagesFromFolder = async (folderName) => {

    const images = [];
    const imageNames = ['base_color.png', 'normal.png', 'height.png', 'smoothness.png']
    for (let name of imageNames) {
        const imagePath = `../assets/images/${folderName}/${folderName}_${name}`;
        const imageModule = await import(imagePath);
        images.push(imageModule.default);
    }

    return images;
}