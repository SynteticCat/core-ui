/**
 * Developer: Ksenia Kartvelishvili
 * Date: 05.12.2014
 * Copyright: 2009-2014 Comindware®
 *       All Rights Reserved
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Comindware
 *       The copyright notice above does not evidence any
 *       actual or intended publication of such source code.
 */

/* global define, require, Backbone, Marionette, $, _ */

define([
        'core/utils/utilsApi',
        'core/collections/VirtualCollection',
        'core/collections/behaviors/HighlightableBehavior',
        '../models/MemberModel'
    ],
    function (utils, VirtualCollection, HighlightableBehavior, MemberModel) {
        'use strict';

        return VirtualCollection.extend({
            initialize: function () {
                utils.applyBehavior(this, HighlightableBehavior);
            },

            model: MemberModel
        });
    });
