// client-side js

var MyApp = new Vue({
  el: '#MyApp',
    data: {
        index:0,
        flag:-1
  },
  methods: {
    connect : function() {
      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;
      
      fetch('/users')
      .then((res) => res.json())
      .then((data) => {
        for(var i=0;i<data.length;i++){
            if(data[i].username === username && data[i].password === password) {
              console.log('ok');
              this.flag = 0;
              document.location.href="/commande.html";
            }
          else {
            console.log('nope' + data[i].username);
          }
        };
        if(this.flag === -1) {   
          document.getElementById('username').value = 'Erreur... :/';
        }
      });
    },
    signup : function() {
      let newUsername = document.getElementById('newUsername').value;
      let newPassword = document.getElementById('newPassword').value;
      let newPasswordVerif = document.getElementById('newPasswordVerif').value;
      
      if(newPassword === newPasswordVerif && newPassword != '' && newUsername != '') {
        fetch('/users', {
          method: 'POST', 
          headers: {
            'Accept':'application/json, text/plain, */*',
            'Content-type':'application/json'
          },
          body: JSON.stringify({
            username: newUsername, 
            password: newPassword
          })
        })
        .then((res) => res.json())
        .then((data) => console.log(data));

        location.reload();
      }
      else {
        console.log("Entrez le même mot de passe sinon ça ne va pas fonctionner ...");
      }
    }
  }
});

$('#SignUpModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) 
  var recipient = button.data('whatever') 
  var modal = $(this)
  modal.find('.modal-title').text('Saisissez vos informations :')
})                 