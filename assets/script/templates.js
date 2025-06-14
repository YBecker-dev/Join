
function getNoteTemplateContact() {
    return `
            <div onclick="openContactOverlay()" class="person">
                <p class="initial">GS</p>
                <div>
                    <h4>${givenName} ${surname}</h4>
                    <p><a class="mail" href="mailto:">${mail}</a></p>
                </div>
            </div>
        `
};