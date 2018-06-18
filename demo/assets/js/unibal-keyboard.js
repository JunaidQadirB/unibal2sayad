$(document).ready(function () {

    let unibal = $('#unibal');
    unibal.keyboard({
        usePreview: true, // disabled for contenteditable
        useCombos: false,
        autoAccept: true,
        layout: 'custom',
        customLayout: {
            'normal': [
                '` f v x é ŕ ŧ ǵ ú í ó ḓ ṱ {del} {b}',
                '{tab} á w e r t y u i o p [ ] \\',
                'a s d đ g h j k l ; \' {enter}',
                '{shift} z ź c ń b n m , . / {shift}',
                '{accept} {space} {left} {right} {undo:Undo} {redo:Redo}'
            ],
            'shift': [
                '~ F V X É Ŕ Ŧ Ǵ Ú Í Ó Ḓ Ṱ {del} {b}',
                '{tab} Á W E R T Y U I O P { } |',
                'A S D F G H J K L : " {enter}',
                '{shift} Z Ź C Ń B N M < > ? {shift}',
                '{accept} {space} {left} {right} {undo:Undo} {redo:Redo}'
            ]
        },
        display: {
            del: '\u2326:Delete',
            redo: '↻',
            undo: '↺'
        }
    });
});