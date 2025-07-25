import { Container, Stack, Typography } from "@mui/material";
import Start from "./Start";
import JavaScriptLogo from "./JavaScriptLogo";
import "./App.css"
import { useQuestionsStore } from "./store/questions";
import Game from "./Game";

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

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
        
      </Container>
    </main>
  );
}

export default App;
