import type { ChatbotQuestionResult } from "@/@types/store/chatbot";
import { addToast } from "@/lib/Sidebar/Toasts/toasts";
import { get, writable } from "svelte/store";

export interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const defaultMessages: Message[] = [
  {
    id: 1,
    text: "Hola! Soy un chatbot especializado en contabilidad y leyes. ¿En qué puedo ayudarte?",
    isBot: true,
  },
];

/**
 * STORE VALUES
 */

export const chatbotMessages = writable<Message[]>(defaultMessages);
export const chatbotLoading = writable<boolean>(false);

/**
 * STORE ACTIONS
 */

export const askChatbot = async (message: string) => {
  const url = `https://2jnkrlxhfh.execute-api.us-east-1.amazonaws.com/dev/chatbot?question=${message}`;

  try {
    const userMessage: Message = {
      id: get(chatbotMessages).length + 1,
      text: message,
      isBot: false,
    };
    chatbotMessages.update((messages) => [...messages, userMessage]);

    chatbotLoading.update(() => true);
    const response = (await fetch(url).then((response) =>
      response.json()
    )) as ChatbotQuestionResult;
    console.log("response", response);

    const newMessage: Message = {
      id: get(chatbotMessages).length + 1,
      text: response.message,
      isBot: true,
    };

    chatbotMessages.update((messages) => [...messages, newMessage]);
    chatbotLoading.update(() => false);
  } catch (error) {
    addToast({
      title: "Error",
      message: "Ocurrió un error al intentar comunicarse con el chatbot",
      type: "error",
    });
  }
};
