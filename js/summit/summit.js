const summit = new Vue({
  el: '#app',
  data: {
      showError: false,
      loader: false,
      name: '',
      phone: '',
      email: '',
      salebotLink: 'https://salebot.site/d0067dd17bb66_1',
  },
  methods: {
      scrollTo(uid) {
          this.$refs[uid].scrollIntoView({
              behavior: 'smooth'
          })
      },
      getUtm(name) {
          const url = new URL(window.location.href)
          const param = url.searchParams.get(name)
          if (param) {
              return '&' + name + '=' + param
          }
          return ''
      },
      sendData() {
          if (this.name && this.phone && this.email) {
              this.loader = true
              let link = this.salebotLink
                  + '?name_forma='
                  + this.name
                  + '&phone='
                  + this.phone
                  + '&email='
                  + this.email
                  + this.getUtm('utm_source')
                  + this.getUtm('utm_medium')
                  + this.getUtm('utm_campaign')
                  + this.getUtm('utm_term')
                  + this.getUtm('utm_content')

              window.location.href = link

              setTimeout(() => {
                  this.loader = false
              }, 2000)

          } else {
              this.showError = true
          }
      }
  },
})