export const Modal = (header, content, footer) => {

    return `
        <div class="overlay">
            <div class="modal">
                <div class="modal-header">
                    <h2 class="modal-title">${header}</h2>
                    <button class="modal-close"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${footer ? `<div class="modal-footer">
                    ${footer}
                </div>` : ''}
               
            </div>
        </div>
    `
}