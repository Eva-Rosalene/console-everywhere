// ==UserScript==
// @name         Console Everywhere
// @namespace    https://github.com/Eva-Rosalene
// @source       https://github.com/Eva-Rosalene/console-everywhere
// @version      1.0
// @description  prevents disabling console[method]
// @author       Eva-Rosalene (https://github.com/Eva-Rosalene)
// @include      *
// @grant        none
// @run-at       document-start
// @updateUrl    https://raw.githubusercontent.com/Eva-Rosalene/console-everywhere/master/console-everywhere.js
// ==/UserScript==

(console => {
  const softFreeze = object => {
    // like 'freeze', except:
    //   1. Allows to add properties
    //   2. Doesn't throw an error on reassignment even in strict mode
    //      (reassignment still doesn't work)
    const ownProperties = Object.getOwnPropertyDescriptors(object);
    let shallow = Object.create(
      Object.getPrototypeOf(object),
      ownProperties
    );
    for (let [prop, desc] of Object.entries(ownProperties)) {
      if (desc.configurable === false) {
        continue;
      }
      Object.defineProperty(object, prop, {
        get() {
          return shallow[prop];
        },
        set() {},
        enumerable: desc.enumerable,
        configurable: false,
      });
    }
  }

  softFreeze(console);
  softFreeze(Object.getPrototypeOf(console));
})(window.console);