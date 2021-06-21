$('body').click(function (event) {
  let traget = event.target.id

  switch (traget) {
    case 'step01':
      $('#line-progress').css('width', '3%')
      $('.basic').addClass('active').siblings().removeClass('active')
      break
    case 'step02':
      $('#line-progress').css('width', '25%')
      $('.fragment').addClass('active').siblings().removeClass('active')
      break
    case 'step03':
      $('#line-progress').css('width', '50%')
      $('.mern').addClass('active').siblings().removeClass('active')
      break
    case 'step04':
      $('#line-progress').css('width', '75%')
      $('.advanced').addClass('active').siblings().removeClass('active')
      break
    case 'step05':
      $('#line-progress').css('width', '100%')
      $('.engineering').addClass('active').siblings().removeClass('active')
      break
  }
})

//确保li被激活
$('.step').click(function () {
  $(this).addClass('active').prevAll().addClass('active')
  $(this).nextAll().removeClass('active')
})
