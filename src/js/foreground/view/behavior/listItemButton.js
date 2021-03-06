﻿define(function(require) {
    'use strict';

    var Tooltipable = require('foreground/view/behavior/tooltipable');

    var ListItemButton = Marionette.Behavior.extend({
        events: {
            'click': '_onClick',
            'dblclick': '_onDblClick'
        },

        behaviors: {
            Tooltipable: {
                behaviorClass: Tooltipable
            }
        },

        onRender: function() {
            //  Prefer setting these in initialize, but currently $el is not available in behaviors until render.
            this.$el.addClass('listItem-button button button--icon button--icon--secondary button--medium');
            this.$el.attr('data-ui', 'tooltipable');
        },

        _onClick: function(event) {
            this._announceClick(event);
            //  Don't allow click to bubble up since handling click at this level.
            return false;
        },

        _onDblClick: function(event) {
            this._announceClick(event);
            //  Don't allow dblClick to bubble up since handling click at this level.
            return false;
        },

        _announceClick: function(event) {
            //  TODO: Prefer not to check hasClass and leverage state of a model.
            if (!this.$el.hasClass('is-disabled')) {
                this.view.triggerMethod('Click');
            }
            //  Since returning false, need to announce the event happened here since root level won't know about it.
            Streamus.channels.element.vent.trigger('click', event);
        }
    });

    return ListItemButton;
});