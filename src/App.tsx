import { Container, Stack, Typography } from "@mui/material";
import Start from "./Start";
import JavaScriptLogo from "./JavaScriptLogo";
import "./App.css"
import { useQuestionsStore } from "./store/questions";
import { ClassSharp } from "@mui/icons-material";

function App() {

  const questions = useQuestionsStore(state => state.questions)
  console.log(questions)

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignContent="center"
          justifyContent="center"
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quizz
          </Typography>
        </Stack>
        <Start />
      </Container>
    </main>
  );
}

export default App;
