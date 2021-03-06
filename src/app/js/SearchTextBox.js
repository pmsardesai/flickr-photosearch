/**
 * This widget allows users to enter search values.
 */
define([ "dojo/_base/declare", 
	"dijit/form/TextBox",
	"app/js/FlickrWrapper",
	"dojo/_base/lang",
	"dojo/dom-class",
	"dojo/dom-construct",
	"dojo/keys",
	"dojo/on"], function (dojo_declare, _TextBox, FlickrWrapper, lang, domClass, domConstruct, keys, on) {

	var proto = {
		// public variable
		filterState: false,

		// private variables + constants
		_advancedFilter: null,
		_clearNode: null,
		_searchNode: null,

		postCreate: function() {
			this.inherited(arguments);
			domClass.add(this.domNode, "search-box");

			this._advancedFilterNode = domConstruct.create("a", {'class': 'fa-sliders fa'}, this.domNode, 'first');
			this.own(on(this._advancedFilterNode, 'click', lang.hitch(this, function() {
				this.set('filterState', !this.filterState);
			})));

			this._sortNode = domConstruct.create("a", {'class': 'fa-sort fa'}, this.domNode, 'first');
			this.own(on(this._sortNode, 'click', lang.hitch(this, function() {
				this.emit('Sort')
			})));

			this._clearNode = domConstruct.create("a", {'class': 'fa-times fa dijitHidden'}, this.domNode, 'last');
			this.own(on(this._clearNode, 'click', lang.hitch(this, function() {
				this.set('value', '');
				domClass.add(this._clearNode, 'dijitHidden');
			})));

			this._searchNode = domConstruct.create("a", {'class': 'fa-search fa'}, this.domNode, 'last');
			this.own(on(this._searchNode, 'click', lang.hitch(this, function() {
				this.emit('Search', {}, [this.get('value')])
			})));
			this.own(on(this.domNode, 'keypress', lang.hitch(this, function(evt) {
				if (evt.keyCode === keys.ENTER) {
					this.emit('Search', {}, [this.get('value')])
				}
			})));
		},

		// SETTERS
		_setFilterStateAttr: function(value){
			if (value !== this.filterState) {
				this._set('filterState', value);
				this.emit('FilterStateChange', {}, [value])
			}
		},

		// @inherited
		_onInput: function(e) {
			this.inherited(arguments);
			// only show clear node if there is anything in textbox
			var value = this.textbox.value;
			domClass.toggle(this._clearNode, 'dijitHidden', !value);
		},

		// DEFAULT EVENTS //
		onSearch: function() { },
		onSort: function() { },
		onFilterStateChange: function() { }
	};

	return dojo_declare("js.SearchTextBox", [_TextBox], proto);
});
