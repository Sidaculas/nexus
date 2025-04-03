import React from "react";
import OnboardingQuiz from "../components/OnboardingQuiz";
import Layout from "../components/Layout";

export default function QuizPage() {
  return (
    <Layout>
      <div className="quiz-container">
        <OnboardingQuiz />
      </div>
    </Layout>
  );
}
