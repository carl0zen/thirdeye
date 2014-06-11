$ ->
  $(".dismissible").click ->
    $(this).hide 150, ->
      $(this).remove()
