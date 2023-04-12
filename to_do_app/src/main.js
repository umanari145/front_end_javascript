const $ = require('jquery')

$('#add_to_btn').on('click', ()=> {
  const contents = $('#contents').val();
  const line = $("#clone_unfinished_todo_area li").clone(true);
  const single_line = line[0];
  const single_line_obj = $(single_line);
  single_line_obj.find('.back_button').hide();
  single_line_obj.find('.text').html(contents)
  $('#unfinished_todo').append(single_line_obj);
})

$(document).on('click', '.delete_button', (event) => {
  $(event.currentTarget).parents('.todo_line').remove();
})

$(document).on('click', '.finish_button', (event) => {
  const finish_element = $(event.currentTarget).parents('.todo_line');
  const finish_element_obj = $(finish_element);
  finish_element_obj.find('.finish_button').hide();
  finish_element_obj.find('.delete_button').hide();
  finish_element_obj.find('.back_button').show();
  $('#finished_todo').append(finish_element_obj);
})

$(document).on('click', '.back_button', (event) => {
  const finish_element = $(event.currentTarget).parents('.todo_line');

  finish_element.find('.back_button').hide();
  finish_element.find('.finish_button').show();
  finish_element.find('.delete_button').show();
  $('#unfinished_todo').append(finish_element);
})