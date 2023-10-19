<script>
  import { askChatbot } from "@/store/chatbot.store";
  let textInput = "";

  const handleSubmit = () => {
    askChatbot(textInput);
    textInput = "";
  };
</script>

<div class="mt-4 flex items-center">
  <form on:submit|preventDefault={handleSubmit} class="w-full flex">
    <input
      bind:value={textInput}
      type="text"
      placeholder="Type your message..."
      class="flex-1 py-2 px-3 rounded-full bg-gray-100 focus:outline-none text-sm text-black"
    />
    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded-full ml-3 hover:bg-blue-600"
    >
      Enviar
    </button>
  </form>
</div>
