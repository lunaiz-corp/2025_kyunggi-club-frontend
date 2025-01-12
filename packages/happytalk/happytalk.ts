declare global {
  interface Window {
    Happytalk: new (props: BootOption) => IHappytalk
    ht?: IHappytalk
  }
}

interface IHappytalk {
  open(): void
  close(): void

  linkToKakao(): void
  linkToNaver(): void

  setParams(params: string): void

  sendText(text: string): void
  sendImage(file: File[] | FileList): void

  endChat(): void

  event: {
    on: (event: string, callback: Function) => void
  }
}

interface BootOption {
  siteId: string
  siteName: string
  categoryId: string
  divisionId: string
  partnerId?: string
  shopId?: string
  params?: string
  kakaoId?: string
  naverId?: string
  dynamicScript?: boolean
  showOnHover?: boolean
  options?: ChatOptions
  chatview?: ChatViewOptions
}

interface ChatOptions {
  theme?: "default" | "simple" | "banner" | "dark"
  title?: string
  subTitle?: string
  titleAlign?: "left" | "center" | "right"
  backgroundColor?: string
  textColor?: string
  isWorktime?: boolean
  isConsultant?: boolean
  isResponseSpeed?: "fast" | "normal" | "slow" | "hide"
  isNotice?: boolean
  isHelpdesk?: boolean
  isPreviousHistory?: boolean
  isChatButtonCall?: "current" | "new"
  pcHappytalkButtonChoice?: 1 | 2 | 3
  pcKakaotalkButtonChoice?: 1 | 2 | 3
  pcNavertalkButtonChoice?: 1 | 2 | 3
  pcButtonPosition?: "left" | "right"
  pcButtonRight?: number
  pcButtonLeft?: number
  pcButtonBottom?: number
  pcButtonSize?: number
  mobileHappytalkButtonChoice?: 1 | 2 | 3
  mobileKakaotalkButtonChoice?: 1 | 2 | 3
  mobileNavertalkButtonChoice?: 1 | 2 | 3
  mobileButtonPosition?: "left" | "right"
  mobileButtonRight?: number
  mobileButtonLeft?: number
  mobileButtonBottom?: number
  mobileButtonSize?: number
  chatWindowWidth?: number
  chatWindowHeight?: number
  basicPlaceholder?: string
  chatbotPlaceholder?: string
}

interface ChatViewOptions {
  only?: boolean
  containerId?: string
}

class HappytalkService {
  async boot(props: BootOption) {
    if (window.ht && "open" in window.ht) {
      return window.console.error("Happytalk script included twice.")
    }

    const $script = document.createElement("script")
    const $element = document.getElementsByTagName("script")[0]

    $script.id = "happytalkSDK"
    $script.async = true
    $script.src =
      "https://chat-static.happytalkio.com/sdk/happytalk.chat.v2.min.js"

    if ($element && $element.parentNode) {
      $element.parentNode.insertBefore($script, $element)
    } else {
      document.body.appendChild($script)
    }

    $script.addEventListener("load", function (e) {
      console.log("Happytalk script loaded.")

      window.ht = new window.Happytalk(props)
      return window.ht
    })
  }

  open() {
    if (!window.ht || !("open" in window.ht)) {
      return window.console.error("Happytalk script not loaded.")
    }

    window.ht.open()
  }

  close() {
    if (!window.ht || !("close" in window.ht)) {
      return window.console.error("Happytalk script not loaded.")
    }

    window.ht.close()
  }

  linkToKakao() {
    if (!window.ht || !("linkToKakao" in window.ht)) {
      return window.console.error("Happytalk script not loaded.")
    }

    window.ht.linkToKakao()
  }

  linkToNaver() {
    if (!window.ht || !("linkToNaver" in window.ht)) {
      return window.console.error("Happytalk script not loaded.")
    }

    window.ht.linkToNaver()
  }

  setParams(params: string) {
    if (!window.ht || !("setParams" in window.ht)) {
      return window.console.error("Happytalk script not loaded.")
    }

    window.ht.setParams(params)
  }

  sendText(text: string) {
    if (!window.ht || !("sendText" in window.ht)) {
      return window.console.error("Happytalk script not loaded.")
    }

    window.ht.sendText(text)
  }

  sendImage(file: File[] | FileList) {
    if (!window.ht || !("sendImage" in window.ht)) {
      return window.console.error("Happytalk script not loaded.")
    }

    window.ht.sendImage(file)
  }

  endChat() {
    if (!window.ht || !("endChat" in window.ht)) {
      return window.console.error("Happytalk script not loaded.")
    }

    window.ht.endChat()
  }

  event = {
    on: (event: string, callback: Function) => {
      if (!window.ht || !("event" in window.ht)) {
        return window.console.error("Happytalk script not loaded.")
      }

      window.ht.event.on(event, callback)
    },
  }
}

export default new HappytalkService()
