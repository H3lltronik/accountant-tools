<script>
    import { onMount } from 'svelte';
    import { open } from '@tauri-apps/api/shell';
  
    function handleAnchorClicks(event) {
      const { target } = event;
      if (target.tagName === 'A') {
        event.preventDefault();
        // If the target has data-type="route_link", it's a link to a route, then dont open it in the browser
        if (target.dataset.type !== 'route_link') {
          open(target.href);
        }
      }
    }
  
    onMount(() => {
      window.addEventListener('click', handleAnchorClicks);
      return () => {
        window.removeEventListener('click', handleAnchorClicks);
      };
    });
  </script>
  