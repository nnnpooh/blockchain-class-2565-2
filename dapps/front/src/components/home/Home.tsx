import { FC } from "react";
import { useContract } from "@src/utils/useContract";
import { useWorkingStore } from "@src/utils/working-store";
import { Container } from "@mantine/core";
const Home: FC = () => {
  useContract();
  const [secret] = useWorkingStore((state) => [state.secret]);
  return <Container size="xl">{secret}</Container>;
};

export default Home;
