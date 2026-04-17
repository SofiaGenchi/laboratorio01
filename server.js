//Se importa el modulo 'net' para crear un servidor TCP
const net = require('net');

// net.createServer() inicializa un nuevo servidor TCP. 
// La función interna se ejecuta cada vez que un cliente se conecta al servidor.
const server = net.createServer((socket) => {
    
    //Informar la IP y el puerto remoto del cliente al conectarse
    console.log(`[CONEXIÓN] Nuevo cliente desde IP: ${socket.remoteAddress}, Puerto: ${socket.remotePort}`);

    //Escuchar los datos enviados por el cliente
    socket.on('data', (datosRecibidos) => {
        // socket.write() envía datos de vuelta al cliente.
        // Agregamos el prefijo requerido antes de los datos recibidos.
        console.log(`Datos recibidos: ${datosRecibidos}`);
        socket.write(`[ECHO-SERVER] > ${datosRecibidos}`);

        //Se cierra la conexion despues de mandar la palabra 'salir'
        if(datosRecibidos.toString().trim() === 'salir') {
            console.log('Cerrando conexion con el cliente...');
            socket.end('Conexion cerrada por el servidor.\n');
        };
    });

    //Detectar y loguear el cierre de la conexión
    socket.on('end', () => {
        console.log(`[DESCONEXIÓN] El cliente ${socket.remoteAddress}:${socket.remotePort} se ha desconectado.`);
    });
    
    //manejo de errores
    socket.on('error', (err) => {
        console.error(`[ERROR] Ocurrió un error en el socket: ${err.message}`);
    });
});

//Escucha Activa en el puerto 3000
server.listen(3000, () => {
    // server.address() nos devuelve un objeto con la información de red del servidor
    const direccion = server.address();
    console.log(`[INICIO] Servidor TCP en escucha activa en el puerto ${direccion.port}`);
});