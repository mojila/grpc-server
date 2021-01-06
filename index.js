const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = path.join(__dirname, 'protos/hello-world.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})
const hello_proto = grpc.loadPackageDefinition(packageDefinition).HelloWorld

function sayHello(call, callback) {
    callback(null, { message: 'Hello ' + call.request.name })
}
function sayHelloAgain(call, callback) {
    callback(null, { message: 'Hello Again ' + call.request.name })
}

function main() {
    const server = new grpc.Server()
    server.addService(hello_proto.Greeter.service, { 
        sayHello: sayHello,
        sayHelloAgain: sayHelloAgain 
    })
    server.bindAsync('0.0.0.0:3999', grpc.ServerCredentials.createInsecure(), () => {
        server.start()
        console.log('Server started')
    })
}

main()