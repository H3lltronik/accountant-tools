<script>
  import botIcon from "@/images/bot-picture.webp";
</script>

<div class={`items-center flex`}>
  <img
    src={botIcon}
    alt="Other User Avatar"
    class="w-8 h-8 rounded-full ml-3"
  />
  <div class={"ml-3 bg-gray-100 p-3 rounded-lg"}>
    <div class="flex items-center justify-center">
      <div
        class="w-2 h-2 bg-gray-800 rounded-full mr-1 animate-bounce animation-delay-0"
      />
      <div
        class="w-2 h-2 bg-gray-800 rounded-full mr-1 animate-bounce animation-delay-100"
      />
      <div
        class="w-2 h-2 bg-gray-800 rounded-full animate-bounce animation-delay-200"
      />
    </div>
  </div>
</div>
