const path = require('path')
const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, 'protos/hello-world.proto')
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})
const hello_proto = grpc.loadPackageDefinition(packageDefinition).HelloWorld

function main() {
    const target = 'localhost:3999'
    const client = new hello_proto.Greeter(target, grpc.credentials.createInsecure())
    const user = 'world'

    client.sayHello({ name: user }, function(err, response) {
        console.log('Greeting:', response.message)
    })

    client.sayHelloAgain({ name: user }, function(err, response) {
        console.log('Greeting:', response.message)
    })
}

main()
