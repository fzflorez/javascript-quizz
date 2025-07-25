import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import type { Question } from "./types"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Footer from "./Footer";

const getBackgroundcolor = (info: Question, index: number) => {
  const {userSelectedAnswer, correctAnswer} = info
  // usuario no ha seleccionado nada todavía
  if ( userSelectedAnswer == null) return "transparent"
  // si ya selecciono pero la solucción es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer) return "transparent"
  // si esta es la solución correcta
  if (index === correctAnswer) return "green"
  // si esta es la solución del usuario pero no es correcta
  if (index === userSelectedAnswer) return "red"
  // si no es ninguna de las anteriores
  return "transparent"

}

const Question = ({info}: {info: Question}) => {

  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card variant="outlined"sx={{bgcolor: "#222", p: 2, textAlign: "left"}}>
      <Typography variant="h5">
        {info.question}
      </Typography>

      <SyntaxHighlighter language="javaScript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333", textAlign: "center"}} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton 
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundcolor(info, index)
              }}
            >
              <ListItemText primary={answer} sx={{textAlign: "center"}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default function Game() {

  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>  
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
