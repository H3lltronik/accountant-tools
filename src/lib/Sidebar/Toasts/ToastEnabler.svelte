<script>
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { addToast } from "./toasts";

  const options = {
    position: "bottom-right",
    duration: 5000,
    dismissible: true,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: "button",
    icon: true,
    rtl: false,
  };
</script>

<SvelteToast {options} />
