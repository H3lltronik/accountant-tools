<script>
  import { addToast, toasts } from "@/store/modal.store";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import { toast } from "@zerodevx/svelte-toast";

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

  $: $toasts.forEach((_toast) => {
    toast.push(_toast.message);
  });
</script>

<SvelteToast {options} />
