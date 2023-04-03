<script>
    import { writable } from 'svelte/store';
    import Modal, { bind } from 'svelte-simple-modal';
    import Popup from './types/InfoPopup.svelte';
    import { isModalOpened, modalParams } from '@/store/modal.store';
    const modal = writable(null);
    $: {
        const showModal = () => modal.set(bind(Popup, { message: $modalParams.message }));
        isModalOpened.subscribe((value) => {
          if (value) {
            showModal();
          } else {
            modal.set(null);
          }
        });
    }

    
  </script>
  
  <Modal show={$modal}>
  </Modal>