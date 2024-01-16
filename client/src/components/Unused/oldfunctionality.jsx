
// HTTP POST REQUESTS & ASYNCHRONOUS STUFF//
// ---------------- //
// react-query + axios integration

// OLD: AXIOS POST REQUESTS + SETS GLOBAL STATE 4 IMAGES
// const onSubmit = async (data, e) => {
//     e.preventDefault();  // Prevent default form submission behavior
//     try {
//         const materialData = {...formData.materialData, ...data};
//         const response = await axios.post('http://localhost:3000/api/generate_texture', {materialData});
//         setGeneratedImages(prevImages => [...prevImages, response.data.image_url]);
//         console.log("Received Image URL:", response.data.image_url);
//     } catch (error) {
//         console.error("Submission error:", error);
//         // Handle error appropriately
//     }
// };

// OLD: USEMUTATION + AXIOS POST REQUESTS

// react-query mutation for sending form data to Flask backend//
// const sendFormDataMutation = useMutation(
//     formData => axios.post('http://localhost:3000/api/generate_texture', formData),
//     {
//         onSuccess: (response) => {
//             //update zustand store for image urls
//             setGeneratedImages(prevImages => [...prevImages, response.data.image_url]);
//             console.log("Received Image URL:", response.data.image_url);
//             //queryClient.invalidateQueries('textureData');
//         },
//         onError: (error) => {
//             console.error("Error in sending form data:", error);
//         }
//     }
// );

// submit handler via mutation function using axios post request//
// const onSubmit = async () => {
//     //SUBMIT VIA: usemutation/react-query
//     try {
//         // Retrieve the latest materialData from the Zustand store

//         const { materialData } = formData;
//         console.log("Submitting form data:", materialData);
//         await sendFormDataMutation.mutateAsync({ materialData });

//     } catch (error) {
//         console.error("Submission error:", error);
//     }
// };