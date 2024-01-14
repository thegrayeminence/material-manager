
// Helper functions for autosuggestion of input boxes for physical properties
// Return the first match alphabetically, or an empty string if no match
export const getClosestMatch = (input, options) => {
    const matches = options.filter(option => option.toLowerCase().startsWith(input.toLowerCase()));
    return matches.sort()[0] || '';
  };
  


  export const toastPromiseOnClick = () => {
    // Create an example promise that resolves in 5s
    const examplePromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(200), 5000)
    })

    // Will display the loading toast until promise resolved
    toast.promise(examplePromise, {
      success: { title: 'Promise resolved', description: 'Looks great' },
      error: { title: 'Promise rejected', description: 'Something wrong' },
      loading: { title: 'Promise pending', description: 'Please wait' },
    })
  }