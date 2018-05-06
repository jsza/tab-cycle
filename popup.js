var background = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('button').addEventListener('click', background.next_tab);
});
