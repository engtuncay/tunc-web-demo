<template>
    <div class="container">
        <h2>Hareket Noktaları</h2>
        <form @submit.prevent="sefer_ara">
            <div class="row align-items-center">
                <div class="col-sm-2">
                    <label class="">Kalkış Noktası</label>
                    <select class="form-control" v-model="kalkis_noktasi">
                        <option value="">Seçiniz</option>
                        <option v-for="item in hareket_noktalari" :value="item.id" v-text="item.aciklama"></option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <label>Varış Noktası</label>
                    <select class="form-control" v-model="varis_noktasi">
                        <option value="">Seçiniz</option>
                        <option v-for="item in hareket_noktalari" :value="item.id" v-text="item.aciklama"></option>
                    </select>
                </div>
                <div class="col-sm-2">
                    <label>Gidiş Tarihi</label>
                    <input type="date" class="form-control" v-model="gidis_tarihi">
                </div>
                <div class="col-auto">
                    <label>&nbsp;</label><br/>
                    <button type="submit" class="btn btn-primary">Ara</button> <!-- btn-block -->
                </div>
            </div>
        </form>
        <hr>

        <div v-if="isLoading">Seferler Yükleniyor...</div>
        {{ mesaj }}
        <div v-if="bulunan_seferler.length">
            <h2>Sefer Listesi</h2>
            <table class="table table-hover">
                <tr v-for="(item, index) in bulunan_seferler">
                    <td>Kalkış Saati
                        <h4>{{ getSaat(item.kalkis_tarihi) }}</h4>
                    </td>
                    <td>Bilet Fiyatı
                        <h4>{{ item.bilet_fiyati }} ₺</h4>
                    </td>
                    <td>
                        <button class="btn btn-success" @click="sefer_sec(item.id)">Koltuk Seç</button>
                    </td>
                </tr>
            </table>
        </div>
<!--        <div v-if="bulunan_koltuklar.length">
            <h2>Koltuk Seçimi</h2>
            <table class="table table-bordered text-center" style="width: inherit">
                <tr>
                    <td v-for="item in getKoltukList('Çiftli', 'Cam Kenarı')">
                        <button :class="{'koltuk': item.durum === 0, 'koltuk koltuk-dolu': item.durum === 1, 'koltuk koltuk-rez': item.durum === 2}"
                                :disabled="item.durum === 1"
                                @click="koltuk_sec(item.id)">
                            {{ item.numara }}
                        </button>
                    </td>
                </tr>
                <tr>
                    <td v-for="item in getKoltukList('Çiftli', 'Koridor')">
                        <button :class="{'koltuk': item.durum === 0, 'koltuk koltuk-dolu': item.durum === 1, 'koltuk koltuk-rez': item.durum === 2}"
                                :disabled="item.durum === 1"
                                @click="koltuk_sec(item.id)">
                            {{ item.numara }}
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colspan="20"></td>
                </tr>
                <tr>
                    <td v-for="item in getKoltukList('Tekli', 'Cam Kenarı')">
                        <button :class="{'koltuk': item.durum === 0, 'koltuk koltuk-dolu': item.durum === 1, 'koltuk koltuk-rez': item.durum === 2}"
                                :disabled="item.durum === 1"
                                @click="koltuk_sec(item.id)">
                            {{ item.numara }}
                        </button>
                    </td>
                </tr>
            </table>
            <hr>
        </div>
        <div v-if="secilen_koltuklar.length">
            <h2>Yolcu Bilgileri</h2>
            <form method="post" action="#" @submit.prevent="true">
                <div v-for="item in secilen_koltuklar" class="form-inline mb-2">
                    <label class="mr-2" for="koltuk">Koltuk Numarası</label>
                    <input type="text" class="form-control col-1 mr-3" v-model="item.numara" id="koltuk" readonly>
                    <label class="mr-2" for="fiyat">Fiyat</label>
                    <input type="text" class="form-control col-1 mr-3" v-model="secilen_sefer.bilet_fiyati" id="fiyat" readonly>
                    <label class="mr-2" for="tck">TCK</label>
                    <input type="text" class="form-control col-2 mr-3" name="tck" id="tck">
                    <label class="mr-2" for="adsoyad">Ad Soyad</label>
                    <input type="text" class="form-control col-2 mr-3" name="adsoyad" id="adsoyad">
                    <label class="mr-2" for="cinsiyet">Cinsiyet</label>
                    <input type="text" class="form-control col-1" name="cinsiyet" id="cinsiyet">
                </div>

                <h2>Ödeme Bilgileri</h2>
                <div class="row">
                    <div class="col-2">
                        <label class="mr-2" for="kk_no">Kart No</label>
                        <input type="text" class="form-control" name="kk_no" id="kk_no">
                    </div>
                    <div class="col-2">
                        <label class="mr-2" for="kk_adsoyad">Ad Soyad</label>
                        <input type="text" class="form-control" name="kk_adsoyad" id="kk_adsoyad">
                    </div>
                    <div class="col-2">
                        <label class="mr-2" for="kk_ccv">CCV</label>
                        <input type="text" class="form-control" name="kk_ccv" id="kk_ccv">
                    </div>
                    <div class="col-3">
                        <label class="mr-2" for="kk_skt_ay">Son Kullanma Tarihi (Ay)</label>
                        <input type="text" class="form-control" name="kk_skt_ay" id="kk_skt_ay">
                    </div>
                    <div class="col-3">
                        <label class="mr-2" for="kk_skt_yil">Son Kullanma Tarihi (Yıl)</label>
                        <input type="text" class="form-control" name="kk_skt_yil" id="kk_skt_yil">
                    </div>
                </div>
                <button class="btn btn-success btn-sm mt-2" @click="odeme_yap()">Ödeme Yap</button>
            </form>
        </div>-->
    </div>
 
</template>

<script>
import db from '../assets/db.json';

export default {
  name: 'SeferAra',
  props: {
    msg: String
  },
  data() {
    return {
      kalkis_noktasi : '',
      varis_noktasi : '',
      gidis_tarihi : '',
      hareket_noktalari : [],
      seferler : [],
      bulunan_seferler : [],
      isLoading : false,
      mesaj : '',
    }
  },
  created() {
    this.hareket_noktalari = db.hareket_noktalari;
    this.seferler = db.seferler;
  },
  methods: {
    sefer_ara(){ 
        this.isLoading = true;
        // console.log(this.seferler);
        this.bulunan_seferler = this.seferler.filter(value =>
            value.kalkis_noktasi === this.kalkis_noktasi &&
            value.varis_noktasi === this.varis_noktasi &&
            this.getTarih(value.kalkis_tarihi) === this.getTarih(this.gidis_tarihi)
        );
        // console.log(this.bulunan_seferler);
        if(this.bulunan_seferler.length == 0) { 
            this.mesaj = 'Sefer Bulunamadı !!!';
         }else {
             this.mesaj = '';
         }
        this.isLoading = false;
    },
    getTarih(val) {
      var date = new Date(val);
      var tarih = date.getFullYear() + '-' + ('0'+ date.getMonth()).slice(-2)
            + '-' + ('0'+ date.getDay()).slice(-2);
      return tarih;
    },
    getSaat(val){
      var date = new Date(val);
      var saat = ('0'+ date.getHours()).slice(-2)
          + '-' + ('0'+ date.getMinutes()).slice(-2);
      return saat;
    },
    sefer_sec(sefer_id){
        this.$router.push({name:'koltuksecime',params : {sefer_id}});
    },
  },


}

</script>
