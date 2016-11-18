define(
	'view',
	['jquery','tmpl'],
	function($,tmpl){
		var View = function(model){
			var self = this;
			function init(){
				var wrapper = tmpl($('#wrapper-template').html());
				$('body').append(wrapper);
				self.elements = {
					input: $('.item-value'),
					addBtn: $('.item-add'),
					listContainer: $('.item-list')
				};						
				self.renderList(model.data);		
			};
			self.editStart = function(target){
				$(target).find('.list-edit')
					.css({'display':'block'})
					.focus();
			};
			self.editFinish = function(target){
				$(target).find('.list-edit').css({'display':'none'});
			};
			self.renderList = function(data){
				var list = tmpl($('#list-template').html(), {data:data});
				self.elements.listContainer.html(list);
			};
			init();
		}
		return View;
	}
);