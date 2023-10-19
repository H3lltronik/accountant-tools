<script lang="ts">
  import PageLayout from "@/lib/Layout/PageLayout.svelte";
  import ChatContainer from "./Components/ChatContainer.svelte";

  let showTutorial = false;
</script>

<PageLayout title="Chatbot">
  <ChatContainer />

  <div class="mt-5" />
</PageLayout>
