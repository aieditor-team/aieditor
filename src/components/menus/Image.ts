import {AbstractMenuButton} from "../AbstractMenuButton.ts";
import {InnerEditor} from "../../core/AiEditor.ts";

export class Image extends AbstractMenuButton {

    fileInput?: HTMLInputElement;

    constructor() {
        super();
        this.template = `
        <div>
        <input type="file" accept="image/*" multiple  style="display: none">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path></svg>
        </div>
        `;
        this.registerClickListener();
    }


    connectedCallback() {
        super.connectedCallback();
        if (this.options?.image?.customMenuInvoke) {
            this.querySelector("input")!.remove();
        } else {
            this.fileInput = this.querySelector("input") as HTMLInputElement;
            this.fileInput!.addEventListener("change", () => {
                const files = this.fileInput?.files;
                if (files && files.length > 0) {
                    for (let file of files) {
                        this.editor?.commands.uploadImage(file);
                    }
                }
                (this.fileInput as any).value = "";
            });
        }
    }


    // @ts-ignore
    onClick(commands) {
        if (this.options?.image?.customMenuInvoke) {
            this.options.image.customMenuInvoke((this.editor as InnerEditor).aiEditor);
        } else {
            this.fileInput?.click();
        }
    }

}


