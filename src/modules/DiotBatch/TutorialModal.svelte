<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    
    export let isOpen = false;
    
    const dispatch = createEventDispatcher();
    
    function closeModal() {
      isOpen = false;
      dispatch('close');
    }
    
    function handleBackdropClick(event: MouseEvent) {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    }

    function downloadTemplate() {
      const link = document.createElement('a');
      link.href = '/assets/diot_template.xlsx';
      link.setAttribute('download', 'diot_template.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    
    }
  </script>
  
  {#if isOpen}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal" on:click={handleBackdropClick}>
      <div class="modal-content">
        <div class="modal-header">
          <h2>Tutorial</h2>
        </div>
        <div class="modal-body">
          <!-- <slot></slot> -->
          <p>Descarga <button on:click={downloadTemplate} class="inline-btn">aqui</button> la plantilla de Excel</p>
        </div>
        <div class="modal-footer">
          <button on:click={closeModal}>Close</button>
        </div>
      </div>
    </div>
  {/if}
  
  <style>
    .modal {
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.4);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .modal-content {
      background-color: white;
      padding: 20px;
      color: black;
      border-radius: 5px;
      box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
    }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .modal-body {
        max-width: 80vw;
        max-height: 60vh;
        overflow-x: hidden;
        overflow-y: auto;
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }

    button {
      /* margin-left: 10px; */
    }
    
    img {
        width: 100%;
        height: 100%;
        max-height: 60vh;
        object-fit: contain;
        object-position: center;
    }
  </style>
  