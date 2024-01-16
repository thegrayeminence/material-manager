

const handleDownload = async (materialId) => {
    try {
        const response = await axios.get(`http://localhost:3001/api/download_material/${materialId}`, {responseType: 'blob'});
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `material_${materialId}.zip`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error("Error downloading material:", error);
        // Handle error
    }
};

<button onClick={() => handleDownload(materialId)}>Download Material</button>
