<template>
  <div class="alert alert-success">
    Merhaba
    <button @click="count++" class="btn btn-sm btn-primary">
      {{ count }} kez tıkladın
    </button>&nbsp;
    <button @click="karsila">{{ mesaj }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      mesaj :'Merhaba'
    }
  },
  methods: {
    karsila() {
      this.mesaj = 'Hoşgeldiniz';
    },
    ugurla() {
      this.mesaj = 'Güle güle';
    },
    emailKaydet() {
      if (this.email != null)
        this.mesaj = 'Email adresiniz kaydedildi.';
    }
  }
}
</script>