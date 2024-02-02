

export const loadImagesFromFolder = async (folderName) => {

    //static setup (images in public folder; no imports needed)
    const basePath = `/assets/images/${folderName}`;
    const imageNames = ['base_color.png', 'normal.png', 'height.png', 'smoothness.png'];
    const images = imageNames.map(name => `${basePath}/${folderName}_${name}`);


    //dynamic setup (images not in public folder; imports needed)

    //const parentFolderPath =  `../../public/assets/images/`;
    // const images = [];
    // const imageNames = ['base_color.png', 'normal.png', 'height.png', 'smoothness.png']
    // for (let name of imageNames) {
    //     const imagePath = `../../public/assets/images/${folderName}/${folderName}_${name}`;
    //     const imageModule = await import(imagePath);
    //     images.push(imageModule.default);
    // }

    return images;
}