const mysql		= require('mysql');

var database;

function handleDisconnect()
{
  database = mysql.createConnection({
      host     : 'vps232468.ovh.net',
      user     : 'admin_camagrure',
      password : 'XFI3lz1BuB',
      database : 'admin_camagru',
      port     : 3306
  });


  database.connect((err) => {
    if (err)
    {
      console.error('error from db connexion', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  database.on('error', (err) => {
    console.error('db_error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST')
      handleDisconnect();
    else
      throw err;
  });
}

handleDisconnect();

module.exports = database;
