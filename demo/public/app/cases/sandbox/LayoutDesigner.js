export default function () {
    const customView = Marionette.View;

    const systemView = Marionette.CompositeView.extend({
        className: 'dev-canvas-wrp js-system-container',

        template: Handlebars.compile(''),

        onRender() {
            this.listenTo(this.model.parent, 'change', this.__updateView);
            this.__updateView(this.model.parent);
        },

        __updateView(model) {
            this.ui.name.text(model.get('name'));
        },

        __toggleCollapse() {
            this.model.set('collapsed', !this.model.get('collapsed'));
        }
    });

    const components = {
        Splitter: {
            view: customView,
            model: Backbone.Model
        },
        SystemView: systemView
    };
    Object.keys(core.form.editors).forEach(key => {
        components[key] = {
            view: core.form.editors[key],
            model: Backbone.Model
        };
    });

    return new core.components.LayoutDesigner.Controller({
        editorModel: new Backbone.Model(),
        detachedToolbar: true,
        palette: {
            toolbar: {},
            collection: new Backbone.Collection(Object.keys(core.form.editors).map(key => ({ fieldType: key, name: key }))),
            elementsCollection: new Backbone.Collection(),
            size: 'small'
        },
        canvas: {
            collection: new Backbone.Collection(),
            components,
            dropZoneType: 'fixed',
            focusOnShow: true
        },
        properties: {
            components: {
                SempleView: Marionette.View,
                SystemView: class {
                    constructor() {
                        return new Core.layout.Form({
                            model: new Backbone.Model(),
                            schema: [
                                {
                                    type: 'v-container',
                                    items: []
                                }]
                        });
                    }
                },
                size: 'large'
            }
        },
        toolbar: {
            excludeActions: ['clone', 'delete']
        }
    }).view;
}
