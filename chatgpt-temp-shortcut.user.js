// ==UserScript==
// @name         ChatGPT Temporary Chat Toggle
// @namespace    https://github.com/diegocerdan/chatgpt-temporary-chat-shortcut
// @version      1.0
// @description  Double-tap Shift to click the temporary chat toggle button
// @author       Diego Cerdán Puyol
// @license      Unlicense
// @match        https://chatgpt.com/
// @match        https://chatgpt.com/?temporary-chat=true
// @icon         https://chatgpt.com/favicon.ico
// @grant        none
// @homepageURL  https://github.com/diegocerdan/chatgpt-temporary-chat-shortcut
// @supportURL   https://github.com/diegocerdan/chatgpt-temporary-chat-shortcut/issues
// ==/UserScript==

(function () {
  'use strict';

  const TEMP_CHAT_ON_LABEL = 'Turn on temporary chat';
  const TEMP_CHAT_OFF_LABEL = 'Turn off temporary chat';
  const DOUBLE_TAP_WINDOW_MS = 350;

  let lastShiftTapAt = 0;

  function getTemporaryChatLabel() {
    const searchParams = new URLSearchParams(window.location.search);

    return searchParams.get('temporary-chat') === 'true'
      ? TEMP_CHAT_OFF_LABEL
      : TEMP_CHAT_ON_LABEL;
  }

  function clickTemporaryChatButton() {
    const temporaryChatButton = document.querySelector(
      `button[aria-label="${getTemporaryChatLabel()}"]`,
    );

    if (temporaryChatButton) {
      temporaryChatButton.click();
    }
  }

  function handleKeydown(event) {
    if (event.key !== 'Shift' || event.repeat) {
      return;
    }

    const now = Date.now();

    if (now - lastShiftTapAt <= DOUBLE_TAP_WINDOW_MS) {
      lastShiftTapAt = 0;
      clickTemporaryChatButton();
      return;
    }

    lastShiftTapAt = now;
  }
  window.addEventListener('keydown', handleKeydown, true);
})();
