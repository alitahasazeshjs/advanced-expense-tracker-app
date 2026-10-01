export function setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
}

export function getThemeFromLS() {
    if(localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }
}