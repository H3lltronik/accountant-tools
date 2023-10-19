<script>
  import { chatbotLoading, chatbotMessages } from "@/store/chatbot.store";
  import ChatInput from "./ChatInput.svelte";
  import Message from "./Message.svelte";

  import botIcon from "@/images/bot-picture.webp";
  import { onMount } from "svelte";
  import BotThinkingMessageItem from "./BotThinkingMessageItem.svelte";

  let messagesContainer = null;

  chatbotMessages.subscribe((messages) => {
    if (messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 100);
    }
  });

  onMount(() => {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
</script>

<div class="p-4 flex-1 max-h-full overflow-hidden">
  <div
    class="bg-white bg-opacity-30 backdrop-blur
    text-gray-300 rounded-lg shadow-md p-4 h-full flex flex-col"
  >
    <div class="flex flex-col justify-center mb-4">
      <div class="flex items-center">
        <img
          src={botIcon}
          alt="Other User Avatar"
          class="w-12 h-12 rounded-full"
        />
        <div class="ml-3 w-full mt-1">
          <p class="text-xl font-medium text-white">Your AI Assistant</p>
          <p class="">Online</p>
        </div>
      </div>
      <hr class="w-full mt-2" />
    </div>

    <div
      bind:this={messagesContainer}
      class="space-y-4 flex-1 overflow-y-auto px-2"
    >
      {#each $chatbotMessages as message}
        <Message isBot={message.isBot} text={message.text} />
      {/each}

      {#if $chatbotLoading}
        <BotThinkingMessageItem />
      {/if}
    </div>
    <ChatInput />
  </div>
</div>
