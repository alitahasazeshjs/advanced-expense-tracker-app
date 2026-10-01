export const Card = (header, content, icon) => {
    return `
        <div class="card">
            <div class="card-main">
                <h3 class="card-title">${header}</h3>
                <div class="card-content">
                ${content}
                </div>
            </div>
            ${icon ? ` <div class="card-icon">
                ${icon}
            </div>` : ""}
           
        </div>
    `
}