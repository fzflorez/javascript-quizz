import { create } from "zustand"
import type { Question } from "../types"

type State = {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
}

export const useQuestionsStore = create<State>(() => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async(limit: number) => {
    console.log("first")
  }
}))