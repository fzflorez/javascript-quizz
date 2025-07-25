import { Button } from "@mui/material"
import { useQuestionsData } from "./hooks/useQuestionsData"
import { useQuestionsStore } from "./store/questions"

export default function Footer() {

  const {correct, incorrect, unasnwered} = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <footer>
      <strong>{`${correct} correctas - ${incorrect} incorrectas - ${unasnwered} sin responder` }</strong>
      <div style={{marginTop: "16px"}}>
        <Button onClick={() => reset()}>
          Resetear juego
        </Button>
      </div>
    </footer>
  )
}
