import { ModalController } from '@ionic/angular';
import { ExporterPage } from './../exporter/exporter.page';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
    private modal: ModalController,
    private titleService: Title,

  ) {
    this.getCats();
    setTimeout(() => {
      this.getexporter("automotive");
      this.getVendors();
    }, 2000);
    this.getTopVendors()
  }

  width = window.innerWidth;
  categories: any;
  showCats: string[] = [];
  products: any[] = [];
  searchFound: any[] = [];
  cat: string = "automotive";
  subCat: string;
  prodLimits: number = 8;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.width = window.innerWidth;
  }

  vendors: any[] = []

  getVendors() {
    const vendors = this.fireStore.collection('vendors').get().subscribe((data: any) => {
      for (var i = 0; i < data.docs.length; i++) {
        this.vendors.push(data.docs[i].Df.sn.proto.mapValue.fields);
      }
      vendors.unsubscribe();
    })
  }
  getCats() {
    const cats = this.fireStore.collection('appData').doc('categories').get().subscribe((data: any) => {
      this.categories = data.Df.sn.proto.mapValue.fields;
      this.showMore();
      cats.unsubscribe();
    })
  }

  async openProfilePage(profileID: string) {
    const model = await this.modal.create({
      component: ExporterPage,
      cssClass: "my-custom-modal-css",
      id: "displayshop",
      componentProps: {
        ExporterID: profileID
      },
    });
    return await model.present();
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  showMore() {
    if (!this.showCats) {
      var currDex = 0;
    } else {
      currDex = this.showCats.length;
    }
    for (var i = currDex; i < currDex + 15; i++) {
      this.showCats.push(this.categories.cats.arrayValue.values[i].stringValue);
    }
  }

  goToPage(path: string) {
    this.router.navigate([path]).then(() => {
    });
  }
  changeCat(cat: string) {
    this.products = [];
    this.cat = cat;
    this.getexporter(cat);
  }
  temp: any;

  getexporter(category: string) {
    this.fireStore.collection('products').doc(category).valueChanges().subscribe((data: any) => {

      if (data) {
        if (data.vendors) {
          this.temp = data.vendors
        }
        else {

        }
      }
      else {

      }
    })
  }

  search(event) {
    this.searchFound = [];
    var found = 0;
    if (event.detail.value != undefined && event.detail.value != "") {
      for (var i = 0; i < this.categories['cats'].arrayValue.values.length; i++) {
        const currentCat = this.categories['cats'].arrayValue.values[i].stringValue;
        if (currentCat.includes(event.detail.value)) {
          found = found + 1;
          if (found < 7) {
            this.searchFound.push({
              name: currentCat,
              type: "category"
            })
          }
        }
        for (var k = 0; k < this.categories[currentCat].arrayValue.values.length; k++) {
          const subCat = this.categories[currentCat].arrayValue.values[k].stringValue;
          if (subCat.includes(event.detail.value)) {
            found = found + 1;
            if (found < 7) {
              this.searchFound.push({
                name: subCat,
                type: "sub-category"
              })
            }
          }
        }
      }
    }
  }

  topvendors: any;

  getTopVendors() {
    this.fireStore.collection('vendors', querry => querry.where('top', '==', true).where('accountstatus', '==', 'approved').orderBy('timestamp', 'asc')).get().subscribe(res => {
      if (res.empty) {


      }
      else {

        this.topvendors = res.docs
      }
    })
  }

  ionViewWillEnter() {
    this.titleService.setTitle("Export Portal - Pakistan's largest export database");
    try {
      document.querySelector("meta[name='description']").remove();
    } catch (e) {
    }
    try {
      document.querySelector("meta[name='keywords']").remove();
    } catch (e) {

    }
    var description = document.createElement('meta');
    description.name = "description";
    description.content = "Export portal for all the major exporters in Pakistan with contact details and available products lsited accordingly.";
    document.getElementsByTagName('head')[0].appendChild(description);

    var keywords = document.createElement('meta');
    keywords.name = "keywords";
    keywords.content = "export portal, export portal pakistan, exportportal pk, exporters list pakistan, pakistan exporters ";
    document.getElementsByTagName('head')[0].appendChild(keywords);
  }

  // getProds(cat: string) {
  //   console.log(cat);
  //   for (var i = 0; i < this.categories[cat].arrayValue.values.length; i++) {
  //     const subCat = this.categories[cat].arrayValue.values[i].stringValue;
  //     console.log("Checking >>> ", subCat);
  //     const getDocs = this.fireStore.collection('products').doc(cat).collection(subCat).get().subscribe((data: any) => {
  //       if (data.empty == false) {
  //         for (var k = 0; k < data.docs.length; k++) {
  //           if (data.docs[k].Df.sn.proto.mapValue.fields != undefined) {
  //             this.products.push(data.docs[k].Df.sn.proto.mapValue.fields);
  //           }
  //           if (k == data.docs.length - 1) {
  //             getDocs.unsubscribe();
  //             alert('no products found')
  //           }
  //         }
  //       }
  //     })
  //   }
  //   console.log('products are', this.products);
  // }


  slideOpts = {
    grabCursor: true,
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    duration: 3000,
    mode: 'ios',
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    on: {
      beforeInit: function () {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };

        this.params = Object.assign(this.params, overwriteParams);
        this.originalParams = Object.assign(this.originalParams, overwriteParams);
      },
      setTranslate: function () {
        const swiper = this;
        const {
          $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
        } = swiper;
        const params = swiper.params.cubeEffect;
        const isHorizontal = swiper.isHorizontal();
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;
        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }
            $cubeShadowEl.css({ height: `${swiperWidth}px` });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;
          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);
          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }
          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + (round * 4 * swiperSize);
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = (3 * swiperSize) + (swiperSize * 4 * round);
          }
          if (rtl) {
            tx = -tx;
          }

          if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }

          const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
          if (progress <= 1 && progress > -1) {
            wrapperRotate = (slideIndex * 90) + (progress * 90);
            if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
          }
          $slideEl.transform(transform$$1);
          if (params.slideShadows) {
            // Set shadows
            let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`,
        });

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
          } else {
            const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
            const multiplier = 1.5 - (
              (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
              + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
            );
            const scale1 = params.shadowScale;
            const scale2 = params.shadowScale / multiplier;
            const offset$$1 = params.shadowOffset;
            $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
          }
        }

        const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
        $wrapperEl
          .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
      },
      setTransition: function (duration) {
        const swiper = this;
        const { $el, slides } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      },
    }
  }

}
