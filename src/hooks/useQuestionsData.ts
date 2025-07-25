import { useQuestionsStore } from "../store/questions"

export const useQuestionsData = () => {
  const questions = useQuestionsStore(state => state. questions)
  let correct = 0 
  let incorrect = 0
  let unasnwered = 0

  questions.forEach(question => {
    const {userSelectedAnswer, correctAnswer} = question
    if (userSelectedAnswer == null) unasnwered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })

  return {correct, incorrect, unasnwered}
}