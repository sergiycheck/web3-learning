type OptionsType = {
  onIgnored?: () => void;
  onFallback?: () => void;
  onReturn?: () => void;
};

class DeepLinker {
  hasFocus = true;
  didHide = false;
  options: OptionsType;
  destroy: () => void;
  openURL: (val: string) => void;

  constructor(options: OptionsType) {
    if (!options) {
      throw new Error("no options");
    }

    this.options = options;

    // add event listeners
    this.bindEvents("add");

    // expose public API
    this.destroy = this.bindEvents.bind(null, "remove");

    this.openURL = (url: string) => {
      // it can take a while for the dialog to appear
      const dialogTimeout = 500;

      const thisSaved = this;
      setTimeout(function () {
        if (thisSaved.hasFocus && options.onIgnored) {
          options.onIgnored();
        }
      }, dialogTimeout);

      window.location.href = url;
    };
  }

  // window is blurred when dialogs are shown
  onBlur() {
    this.hasFocus = false;
  }

  // document is hidden when native app is shown or browser is backgrounded
  onVisibilityChange(e) {
    if (e.target.visibilityState === "hidden") {
      this.didHide = true;
    }
  }

  // window is focused when dialogs are hidden, or browser comes into view
  onFocus() {
    if (this.didHide) {
      if (this.options.onReturn) {
        this.options.onReturn();
      }

      this.didHide = false; // reset
    } else {
      // ignore duplicate focus event when returning from native app on
      // iOS Safari 13.3+

      if (!this.hasFocus && this.options.onFallback) {
        // wait for app switch transition to fully complete - only then is
        // 'visibilitychange' fired
        const thisValue = this;
        setTimeout(() => {
          // if browser was not hidden, the deep link failed
          if (!thisValue.didHide && thisValue.options.onFallback) {
            thisValue.options.onFallback();
          }
        }, 1000);
      }
    }

    this.hasFocus = true;
  }

  // add/remove event listeners
  // `mode` can be "add" or "remove"
  bindEvents(action: string) {
    const configurationArrOfArraysOfObjectEventAndHandlers = [
      [window, "blur", this.onBlur],
      [document, "visibilitychange", this.onVisibilityChange],
      [window, "focus", this.onFocus],
    ];

    configurationArrOfArraysOfObjectEventAndHandlers.forEach(
      (configuration) => {
        const [windowOrDocument, event, eventHandler] = configuration;
        windowOrDocument[`${action}EventListener`](event, eventHandler);
      }
    );
  }
}

const getLinker = (fallbackUrl: string) => {
  const options: OptionsType = {
    onIgnored: function () {
      window.open(fallbackUrl);
      console.log("browser failed to respond to the deep link");
    },
    onFallback: function () {
      console.log("dialog hidden or user returned to tab");
    },
    onReturn: function () {
      console.log("user returned to the page from the native app");
    },
  };

  const linker = new DeepLinker(options);

  return linker;
};

export default getLinker;
