import {useToast, Button} from "@chakra-ui/react";


//async chakra ui toast loading functions
export default function ToastPromiseButton({text}) {
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
          success: {title: 'Promise resolved', description: 'Your materials are ready!'},
          error: {title: 'Promise rejected', description: 'Something went wrong with your request..'},
          loading: {title: 'Promise pending', description: 'Generating your materials...'},
        })
      }}
    >
      {text}
    </Button>
  )
}

