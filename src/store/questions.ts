import { create } from "zustand"
import type { Question } from "../types"
import confetti from "canvas-confetti"
import { devtools, persist } from "zustand/middleware"

type State = {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(devtools(persist((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async(limit: number) => {
    const res = await fetch("http://localhost:5173/data.json")
    const json = await res.json()

    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    set({questions})
  },
  selectAnswer: (questionId: number, answerIndex: number) => {
    const {questions} = get()
    // user el structuredClone para clonar el objeto
    const newQuestions = structuredClone(questions)
    // encontramos el indice de la pregunta
    const questionIndex = newQuestions.findIndex(q => q.id === questionId)
    // obtenemos la información de la pregunta
    const questionInfo = newQuestions[questionIndex]
    // averiguamos si el usuario ha seleccionado la respuesta correcta
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

    if (isCorrectUserAnswer) confetti()

    // cambiar esta información en la copia de la pregunta
    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answerIndex
    }
    // actualizamos el estado
    set({questions: newQuestions})
  },
  goNextQuestion: () => {
    const {currentQuestion, questions} = get()
    const nextQuestion = currentQuestion + 1

    if ( nextQuestion < questions.length) {
      set({currentQuestion: nextQuestion})
    }
  },
  goPreviousQuestion: () => {
    const {currentQuestion} = get()
    const previousQuestion = currentQuestion - 1

    if (previousQuestion >= 0) {
      set({currentQuestion: previousQuestion})
    }
  },
  reset: () => {
    set({currentQuestion: 0, questions: []})
  }
}),{
  name: "questions"
})))