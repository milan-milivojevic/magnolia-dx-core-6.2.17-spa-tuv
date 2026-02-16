CKEDITOR.editorConfig = function( config ) {

    // Primer uklanjanja nepotrebnih pluginova, dugmića itd.
    config.removePlugins = 'resize';
    config.resize_enabled = false;
    config.removePlugins = 'elementspath';

    // Dostupne veličine fonta
    config.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px';

    // Ovde definišeš sve varijante Graphik fonta
    config.stylesSet = [
        // --- Blok varijante (element: 'p') ---
        { name: 'Graphik-Thin',              element: 'p', styles: { 'font-family': 'Graphik-Thin, sans-serif' } },
        { name: 'Graphik-ThinItalic',        element: 'p', styles: { 'font-family': 'Graphik-ThinItalic, sans-serif' } },
        { name: 'Graphik-Extralight',        element: 'p', styles: { 'font-family': 'Graphik-Extralight, sans-serif' } },
        { name: 'Graphik-ExtralightItalic',  element: 'p', styles: { 'font-family': 'Graphik-ExtralightItalic, sans-serif' } },
        { name: 'Graphik-Light',             element: 'p', styles: { 'font-family': 'Graphik-Light, sans-serif' } },
        { name: 'Graphik-LightItalic',       element: 'p', styles: { 'font-family': 'Graphik-LightItalic, sans-serif' } },
        { name: 'Graphik-Regular',           element: 'p', styles: { 'font-family': 'Graphik-Regular, sans-serif' } },
        { name: 'Graphik-RegularItalic',     element: 'p', styles: { 'font-family': 'Graphik-RegularItalic, sans-serif' } },
        { name: 'Graphik-Medium',            element: 'p', styles: { 'font-family': 'Graphik-Medium, sans-serif' } },
        { name: 'Graphik-MediumItalic',      element: 'p', styles: { 'font-family': 'Graphik-MediumItalic, sans-serif' } },
        { name: 'Graphik-Semibold',          element: 'p', styles: { 'font-family': 'Graphik-Semibold, sans-serif' } },
        { name: 'Graphik-SemiboldItalic',    element: 'p', styles: { 'font-family': 'Graphik-SemiboldItalic, sans-serif' } },
        { name: 'Graphik-Bold',              element: 'p', styles: { 'font-family': 'Graphik-Bold, sans-serif' } },
        { name: 'Graphik-BoldItalic',        element: 'p', styles: { 'font-family': 'Graphik-BoldItalic, sans-serif' } },
        { name: 'Graphik-Black',             element: 'p', styles: { 'font-family': 'Graphik-Black, sans-serif' } },
        { name: 'Graphik-BlackItalic',       element: 'p', styles: { 'font-family': 'Graphik-BlackItalic, sans-serif' } },
        { name: 'Graphik-Super',             element: 'p', styles: { 'font-family': 'Graphik-Super, sans-serif' } },
        { name: 'Graphik-SuperItalic',       element: 'p', styles: { 'font-family': 'Graphik-SuperItalic, sans-serif' } },

        // --- Inline varijante (element: 'span') ---
        { name: 'Graphik-Thin inline',              element: 'span', styles: { 'font-family': 'Graphik-Thin, sans-serif' } },
        { name: 'Graphik-ThinItalic inline',        element: 'span', styles: { 'font-family': 'Graphik-ThinItalic, sans-serif' } },
        { name: 'Graphik-Extralight inline',        element: 'span', styles: { 'font-family': 'Graphik-Extralight, sans-serif' } },
        { name: 'Graphik-ExtralightItalic inline',  element: 'span', styles: { 'font-family': 'Graphik-ExtralightItalic, sans-serif' } },
        { name: 'Graphik-Light inline',             element: 'span', styles: { 'font-family': 'Graphik-Light, sans-serif' } },
        { name: 'Graphik-LightItalic inline',       element: 'span', styles: { 'font-family': 'Graphik-LightItalic, sans-serif' } },
        { name: 'Graphik-Regular inline',           element: 'span', styles: { 'font-family': 'Graphik-Regular, sans-serif' } },
        { name: 'Graphik-RegularItalic inline',     element: 'span', styles: { 'font-family': 'Graphik-RegularItalic, sans-serif' } },
        { name: 'Graphik-Medium inline',            element: 'span', styles: { 'font-family': 'Graphik-Medium, sans-serif' } },
        { name: 'Graphik-MediumItalic inline',      element: 'span', styles: { 'font-family': 'Graphik-MediumItalic, sans-serif' } },
        { name: 'Graphik-Semibold inline',          element: 'span', styles: { 'font-family': 'Graphik-Semibold, sans-serif' } },
        { name: 'Graphik-SemiboldItalic inline',    element: 'span', styles: { 'font-family': 'Graphik-SemiboldItalic, sans-serif' } },
        { name: 'Graphik-Bold inline',              element: 'span', styles: { 'font-family': 'Graphik-Bold, sans-serif' } },
        { name: 'Graphik-BoldItalic inline',        element: 'span', styles: { 'font-family': 'Graphik-BoldItalic, sans-serif' } },
        { name: 'Graphik-Black inline',             element: 'span', styles: { 'font-family': 'Graphik-Black, sans-serif' } },
        { name: 'Graphik-BlackItalic inline',       element: 'span', styles: { 'font-family': 'Graphik-BlackItalic, sans-serif' } },
        { name: 'Graphik-Super inline',             element: 'span', styles: { 'font-family': 'Graphik-Super, sans-serif' } },
        { name: 'Graphik-SuperItalic inline',       element: 'span', styles: { 'font-family': 'Graphik-SuperItalic, sans-serif' } }
    ];

    config.toolbarGroups = [
        { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms',       groups: [ 'forms' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        '/',
        { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links',       groups: [ 'links' ] },
        { name: 'insert',      groups: [ 'insert' ] },
        '/',
        { name: 'styles',      groups: [ 'styles' ] },
        { name: 'colors',      groups: [ 'colors' ] },
        { name: 'tools',       groups: [ 'tools' ] },
        { name: 'others',      groups: [ 'others' ] },
        { name: 'about',       groups: [ 'about' ] },
        { name: 'customfont' }
    ];

    config.removeButtons = 'Save,ExportPdf,NewPage,Preview,Print,Templates,Find,Replace,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,CreateDiv,Blockquote,BidiLtr,BidiRtl,Language,Image,Flash,PageBreak,Iframe,About,ShowBlocks,Maximize';
};
