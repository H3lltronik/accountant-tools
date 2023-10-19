<script>
  export let isBot = false;
  export let text = "";

  import botIcon from "@/images/bot-picture.webp";
  import userIcon from "@/images/user.webp";
</script>

<div
  class={`items-center ${
    isBot ? "flex items-start" : "flex items-end justify-end"
  }`}
>
  {#if isBot}
    <img
      src={botIcon}
      alt="Other User Avatar"
      class="w-8 h-8 rounded-full ml-3"
    />
  {/if}
  <div
    class={`max-w-sm ${
      isBot ? "ml-3 bg-gray-100 p-3 rounded-lg" : "bg-blue-500 p-3 rounded-lg"
    }`}
  >
    <p class={isBot ? "text-sm text-gray-800" : "text-sm text-white"}>
      {text}
    </p>
  </div>
  {#if !isBot}
    <img
      src={userIcon}
      alt="Other User Avatar"
      class="w-8 h-8 rounded-full ml-3"
    />
  {/if}
</div>
