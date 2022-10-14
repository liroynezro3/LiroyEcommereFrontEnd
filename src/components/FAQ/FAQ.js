import React, { useState } from "react";
import classes from "./FAQ.module.css";
import FAQContext from "./FAQContext";
function FAQ() {
  const Faqs = [
    {
      question: "With which card can I pay?",
      answer: "You can pay by Visa and PayPal.",
    },
    {
      question: "Who developed this site?",
      answer: "Liroy developed this site.",
    },
    {
      question: "What is your location?",
      answer: "At the moment it is an online store, in the future we will add a location and a map.",
    },
    {
      question: "How do I contact you if I have a problem?",
      answer: "You can contact us via WhatsApp, Facebook and Instagram on the links below.",
    },
  ];
  const context = Faqs.map((item,i)=>(<FAQContext question={item.question} answer={item.answer} key={i}></FAQContext>))
  return (
    <div className={classes.faq}>
      <h1>FAQ</h1>
      {context}
    </div>
  );
}

export default FAQ;
