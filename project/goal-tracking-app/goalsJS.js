//流程
//1.初始化准备（创建所有任务数组、索引下标）
//2.保存任务，获取任务
//3.清空当日任务，更改任务状态

let allGoals = new Array()
let selectedGoalIndex = 0

$('document').ready(function () {
  init()
})

let init = function () {
  getGoals()
}

//获取任务函数
let getGoals = function () {
  let saveGoals = JSON.parse(localStorage.getItem('goals'))

  if (saveGoals != '' && saveGoals != null) {
    allGoals = saveGoals

    //搭建输出的列表
    let output = "<ul data-role='listview' id='goalListView'>"
    //两种状态
    //第一种是待办事项
    output += "<li data-role='list-divider'>待办事项</li>"
    for (let i = 0; i < allGoals.length; i++) {
      if (allGoals[i].status != 'complete') {
        let goalText = parseGoal(allGoals[i]) //从对象中获取文本值

        output =
          output + "<li onclick='editGoal(" + i + ")'>" + goalText + '</li>'
      }
    }
    //第二种是已完成事项
    output += "<li data-role='list-divider'>已完成事项</li>"
    for (let i = 0; i < allGoals.length; i++) {
      if (allGoals[i].status == 'complete') {
        let goalText = parseGoal(allGoals[i])
        output += '<li><strike>' + goalText + '</strike></li>'
      }
    }

    output += '</ul>'

    console.log(output)
    $('#goalsList').html(output)
    $('#goalListView').listview().trigger('create')
  }
}

//保存任务函数
let saveGoal = function () {
  let goalText = document.getElementById('goal').value
  let theGoal = new Goal(Date.now(), goalText, 'incomplete')
  allGoals.push(theGoal)
  //存储在本地
  localStorage.setItem('goals', JSON.stringify(allGoals))
  getGoals()
  $('#goal').val('')
}
//新一天函数（清空任务）
let newDay = function () {
  allGoals = []
  localStorage.setItem('goals', JSON.stringify(allGoals))
  $('#goalListView').html('')
}

let editGoal = function (goalIndex) {
  $('#popupBasic').popup('open')
  selectedGoalIndex = goalIndex
}

let closeDialog = function () {
  $('#popupBasic').popup('close')
}

let completeGoal = function () {
  closeDialog()
  allGoals[selectedGoalIndex].status = 'complete'
  localStorage.setItem('goals', JSON.stringify(allGoals))
  getGoals()
}

//从对象中获取有效文本值
let parseGoal = function (goalText) {
  let goalDate = new Date(goalText.date)
  let month = goalDate.getMonth()
  let day = goalDate.getDate()
  let year = goalDate.getFullYear()
  let text = goalText.goalText
  let out = month + 1 + '/' + day + '/' + year + '<br/>'
  out += '<h2>' + text + '</h2>'
  return out
}

//触发的事件
$('#btnSave').bind('click', saveGoal)
$('#btnNewDay').bind('click', newDay)
