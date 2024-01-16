import {useToast, Button} from "@chakra-ui/react";


//async chakra ui toast loading functions
export default function ToastPromiseButton() {
  const toast = useToast()

  //example promise that resolves in 5s
  const examplePromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(200), 5000)
  })
  return (
    <Button
      onClick={() => {


        // Will display the loading toast until the promise resolved/rejected
        toast.promise(examplePromise, {
          success: {title: 'Promise resolved', description: 'Looks great'},
          error: {title: 'Promise rejected', description: 'Something wrong'},
          loading: {title: 'Promise pending', description: 'Please wait'},
        })
      }}
    >
      Show Toast
    </Button>
  )
}
