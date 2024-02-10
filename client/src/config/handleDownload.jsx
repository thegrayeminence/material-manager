import {defineConfig} from 'vite'

export const handleDownload = async (materialId) => {

    console.log("material_id:", materialId)
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}download_material/${materialId}`, {responseType: 'blob'});
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        console.log("link:", link, "url:", url)
        link.setAttribute('download', `material_${materialId}.zip`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error("Error downloading material:", error);

    }
};