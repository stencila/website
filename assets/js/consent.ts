import Haven from '@chiiya/haven'

export const requestConsent = () => {
  Haven.create({
    notification: {
      position: 'bottom',
      policyUrl: 'https://policies.stenci.la/privacy',
      styles: {
        background: '#dbdbdb',
        linkColor: '#363636',
        textColor: '#363636',
        buttonBackgroundColor: '#2568ef',
        buttonBackgroundColorHover: '#1c4fb5',
        buttonTextColor: '#fff',
      },
    },
    services: [
      {
        name: 'posthog',
        purposes: ['analytics'],
        inject: () => {
          const firstScript = document.getElementsByTagName('script')[0]
          const script = document.createElement('script')
          script.src = `/js/posthog.js`
          firstScript.parentNode!.insertBefore(script, firstScript)
        },
      },
    ],
  })
}
