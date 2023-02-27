import { FC, useState } from "react";
import { useContract } from "@src/utils/useContract";
import { useWorkingStore } from "@src/utils/working-store";
import { Container, Input, Button } from "@mantine/core";
const Home: FC = () => {
  const { writeSecret } = useContract();
  const [secret] = useWorkingStore((state) => [state.secret]);
  const [text, setText] = useState("");

  return (
    <Container size="xl">
      <div>{secret}</div>
      <div>
        <Input
          onChange={(e) => {
            // console.log(e.target.value);
            setText(e.target.value);
          }}
        />
      </div>
      <Button onClick={() => writeSecret(text)} className="bg-gray-600">
        Change Secret
      </Button>
    </Container>
  );
};

export default Home;
