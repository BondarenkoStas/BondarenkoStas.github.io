define(
	'controller',
	['jquery'],
	function($){
		Controller = function(model,view){
			var self = this;
			var edited = false;

			view.elements.addBtn.on('click', addItem);
			view.elements.listContainer.on('click','.item-delete',removeItem);
			view.elements.listContainer.on('dblclick','.list-data',editItem);

			function addItem(){
				var newItem = view.elements.input.val();
				model.addItem(newItem);
				view.renderList(model.data);
				view.elements.input.val('');
			}
			function removeItem(){
				var item = $(this).attr('data-value');
				model.removeItem(item);
				view.renderList(model.data);
			}
			function saveChanged(e,target){
				if(!target.is($(e.target)) && target.has(e.target).length===0){
					view.editFinish(target);
					var item = target.children('.list-data').html();
					var newItem = target.children('.list-edit').val();
					model.changeItem(item,newItem);
					view.renderList(model.data);
					$(document).off('click');
				}
			}
			function editItem(event){
				var target = $(event.target).parent();
				view.editStart(target);
				$(document).on('click',function(e){
					saveChanged(e,target);
				});
			}

		};
		return Controller;
	}
);

