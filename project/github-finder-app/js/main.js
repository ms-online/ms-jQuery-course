$(document).ready(function () {
  $('#searchUser').on('keyup', function (e) {
    let username = e.target.value

    //发起ajax请求
    $.ajax({
      url: 'https://api.github.com/users/' + username,
      data: {
        client_id: '83019b07ee850699cf86 ',
        client_secret: 'ad24021f505ef2f531d18f3c897a5ef24c3e2c13',
      },
    }).done(function (user) {
      console.log(user)
      //发起ajax请求获取repos信息
      $.ajax({
        url: 'https://api.github.com/users/' + username + '/repos',
        data: {
          client_id: '83019b07ee850699cf86 ',
          client_secret: 'ad24021f505ef2f531d18f3c897a5ef24c3e2c13',
          sort: 'created: asc',
          per_page: 5,
        },
      }).done(function (repos) {
        console.log(repos)
        $.each(repos, function (index, repo) {
          $('#repos').append(`
          <div class="card m-1 ">
                <div class="row">
                  <div class="col-md-7">
                    <strong>${repo.name}</strong>: ${repo.description}
                  </div>
                  <div class="col-md-3">
                    <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                    <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                    <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                  </div>
                  <div class="col-md-2">
                    <a href="${repo.html_url}" target="_blank" class="btn btn-dark">进入仓库</a>
                  </div>
                </div>
              </div>
          `)
        })
      })
      //渲染用户信息到DOM
      $('#profile').html(`
      <div class="card border-dark mb-3" style="max-width: 100rem;">
      <div class="card-header"><h3>${user.name}</h3></div>
      <div class="card-body">
      <div class="row">
      <div class="col-md-3">
        <img class="img-thumbnail avatar" src="${user.avatar_url}">
        <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">查看详情</a>
      </div>
      <div class="col-md-9">
        <span class="badge badge-dark">Public Repos: ${user.public_repos}</span>
        <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
        <span class="badge badge-success">Followers: ${user.followers}</span>
        <span class="badge badge-info">Following: ${user.following}</span>
        <br><br>
        <ul class="list-group">
          <li class="list-group-item">公司: ${user.company}</li>
          <li class="list-group-item">网站/博客: <a href="${user.blog}" target="_blank">${user.blog}</a></li>
          <li class="list-group-item">地区: ${user.location}</li>
          <li class="list-group-item">注册时间: ${user.created_at}</li>
        </ul>
        </div>
      </div>
    </div>
    </div>
    <h3 class="page-header">最新仓库</h3>
    <div id="repos"></div>
    `)
    })
  })
})
