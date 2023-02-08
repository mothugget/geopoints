import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";

function BackButton({text}: {text: string}) {
  const router = useRouter();

  return (
    <Button
      ripple={false}
      onClick={() => {
        router.back();
      }}
      className="fixed bottom-20 right-4 bg-light-green-700"
    >
      {text}
    </Button>
  );
}

export default BackButton;
