import { FC, ReactElement, useState } from "react";
import { useContract } from "./useContract";
import { useWorkingStore } from "@src/utils/stores";
import { Container, Input, Button, Loader } from "@mantine/core";
import { IconFileBroken } from "@tabler/icons";
const Home: FC = () => {
  const { writeSecret, isLoading, isError } = useContract();
  const [secret] = useWorkingStore((state) => [state.secret]);
  const [text, setText] = useState("");

  return (
    <Container size="xl" className="flex flex-col gap-2">
      <div className="flex h-40 flex-col items-center justify-center gap-3 rounded-lg bg-sky-600">
        <span className="text-lg italic text-white">My secret is ...</span>
        <Secret isError={isError} isLoading={isLoading} />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 self-center rounded-lg border p-3">
        <Input
          onChange={(e) => setText(e.target.value)}
          className="w-80"
          disabled={isLoading || isError}
        />
        <Button
          onClick={() => writeSecret(text)}
          className="bg-sky-600 hover:bg-sky-700"
          disabled={isLoading || isError}
        >
          Change Secret
        </Button>
      </div>
    </Container>
  );
};

export default Home;

interface Props {
  isLoading: boolean;
  isError: boolean;
}
const Secret: FC<Props> = ({ isLoading, isError }) => {
  const [secret] = useWorkingStore((state) => [state.secret]);

  if (isLoading) return <Loader />;
  if (isError) return <IconFileBroken size={50} className="text-white" />;

  return <span className="text-4xl font-bold text-white">{secret}</span>;
};
