<script>
    import { writable } from 'svelte/store';
    import * as store from '../../store';
    import Modal, { bind } from 'svelte-simple-modal';
    import Popup from './Popup.svelte';
    const modal = writable(null);
    
    

    $: {
        const showModal = () => modal.set(bind(Popup, {}));

        store.columnsModalOpen.subscribe((value) => {
            if (value) {
                showModal();
            } else {
                modal.set(null);
            }
        });
    }

    const closeModal = () => {
        store.columnsModalOpen.set(false);
    };
  </script>
  
  <Modal show={$modal} on:close={closeModal}>
  </Modal>