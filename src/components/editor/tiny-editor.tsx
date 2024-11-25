"use client";

import { useRef } from "react";
import { Editor, IAllProps } from "@tinymce/tinymce-react";

export default function TinyEditor(props: IAllProps) {
  const editorRef = useRef<Editor | null>(null);
  return (
    <>
      <Editor
        scriptLoading={{
          async: true,
        }}
        {...props}
        ref={editorRef}
        apiKey="6sdriiy4kglg2pwavlsbi4qciqfyszpq2g1w1hbjvikt3nib"
        init={{
          min_height: 500,
          plugins:
            "preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists charmap emoticons accordion",
          editimage_cors_hosts: ["picsum.photos"],
          menubar: "file edit view insert format tools table help",
          toolbar:
            "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link mediaLibrary image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
          promotion: false,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_advtab: true,
          image_caption: true,
          noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",
          contextmenu: "link image table",
          font_size_input_default_unit: "px",
          font_size_formats: "8px 10px 12px 14px 16px 18px 24px 36px 48px",
          ui_mode: "split",
          skin: "oxide-dark",
          content_css: "dark",
          ...props.init,
        }}
      />
    </>
  );
}
