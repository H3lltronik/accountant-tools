<script>
    import { onMount } from 'svelte';
    import { open } from '@tauri-apps/api/shell';
  
    function handleAnchorClicks(event) {
      const { target } = event;
      if (target.tagName === 'A') {
        event.preventDefault();
        open(target.href);
      }
    }
  
    onMount(() => {
      window.addEventListener('click', handleAnchorClicks);
      return () => {
        window.removeEventListener('click', handleAnchorClicks);
      };
    });
  </script>
  