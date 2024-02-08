
// //handles form submission of filedata w/ dropzone
// const {getRootProps, getInputProps} = useDropzone({
//     onDrop: acceptedFiles => {
//         setImagePreviews(acceptedFiles.map(file => Object.assign(file, {
//             preview: URL.createObjectURL(file)
//         })));
//         setFileData(acceptedFiles.map(file => ({
//             filename: file.name,
//             size: file.size,
//             type: file.type
//         })));
//     }
// });

//helper function

// // cleanup function 4 memory leak prevantage; called when components unmount/imagePreviews arr changes
// useEffect(() => {
//     return () => {
//         imagePreviews.forEach(preview => {
//             if (preview.preview) {
//                 // revoke blob URL to free up memory
//                 URL.revokeObjectURL(preview.preview);
//             }
//         });
//     };
// }, [imagePreviews]); // cleanup function runs when imagePreviews changes


//form element logic:

// {/* MODE 1: Manual File Upload Section */}
// {
//     progress === 2 && mode === 1 && (
//         <>
//             <FormControl mb={4}>
//                 <FormLabel>Upload Texture Files</FormLabel>
//                 <div {...getRootProps()} style={{border: '2px dashed gray', padding: '20px', textAlign: 'center', cursor: 'pointer'}}>
//                     <input {...getInputProps()} />
//                     <p>Drag 'n' drop files here, or click to select files</p>
//                 </div>

//             </FormControl>
//         </>
//     )
// }


// {/* MODE 1 : Manual Uploads */}
// {
//     progress < 2 && mode === 1 && (
//         <Button colorScheme="green" w="full" onClick={handleNext}>
//             {'Next'}
//         </Button>
//     )
// }
// {
//     progress === 2 && mode === 1 && (
//         <Button type="submit" colorScheme="green" w="full"
//         //onClick={toastPromiseOnClick}
//         >
//             {'Submit'}
//         </Button>
//     )
// }


//stepper element logic:
// {mode === 1 && (
//         <Stepper
//           colorScheme={useColorModeValue('twitter', 'purple')}

//           size='md' index={progress} gap='0'>
//           {stepsMode1.map((step, index) => (
//             <Step key={index} gap='0'>
//               <StepIndicator>
//                 <StepStatus complete={<StepIcon />} />
//               </StepIndicator>
//               <StepSeparator _horizontal={{ml: '0'}} />
//             </Step>
//           ))}
//         </Stepper>)}
//       <Text color={useColorModeValue('whiteAlpha.800', 'whiteAlpha.800')}
//       >
//         Step {progress + 1}: <b>{activeStepText}</b>
//       </Text>

//zustand store logic
// store for global values for form settings and options (e.g. AI generation mode/manual uploads)
// mode 0 = default mode w/ AI generation ; mode 1 = manual mode w/o AI generation
// export const useFormMode = create((set) => ({
//   mode: 0,
//   incrementMode: () => set((state) => ({mode: state.mode + 1})),
//   decrementMode: () => set((state) => ({mode: state.mode - 1})),
//   resetMode: () => set({mode: 0}),
// }))
