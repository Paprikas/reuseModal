(function ( $ ) {

    $.fn.reuseModal = function( options ) {
        var modalWindow = $('#modal_window');

        var settings = $.extend({
            modalTitle: modalWindow.find('.modal-title'),
            modalBody: modalWindow.find('.modal-body'),
            modalFooter: modalWindow.find('.modal-footer'),
            title: '',
            body: '',
            footer: '',
            removeClass: '.mdl-remove',
            action: 'open',
            state: 'new'
        }, options );

        // Remove all elements with marked class when opening modal and state is finished
        if (modalWindow.data('state') === 'finished') {
            $(settings.removeClass).remove();
        }

        // If title is not set, get title from data-modal-title attribute
        if (!settings.title) {
            settings.title = this.data('modal-title');
            // If data-modal-title attribute is undefined, get title from this tag text
            if (typeof(settings.title) === 'undefined') {
                settings.title = this.text();
            }
        }

        // If modal was finished or action sent "update" - reload all data
        if (modalWindow.data('state') !== 'new' || settings.action === 'update') {
            settings.modalTitle.html(settings.title);
            settings.modalBody.html(settings.body);
            settings.modalFooter.prepend(settings.footer);
        }

        // Update state of the modal
        modalWindow.data('state', settings.state);

        // If action is open - open the modal
        if (settings.action === 'open') {
            modalWindow.modal();
        }

        return this;

    };

}( jQuery ));
