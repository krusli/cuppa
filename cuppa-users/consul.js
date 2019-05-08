// consul (service discovery)
const consul = require('consul')();

const register = () => {
    const options = {
        name: 'cuppa-users',
        tags: ['node', 'mongo'],
        port: 3000,
        check: {
            notes: 'HTTP Health Check',
            http: 'http://localhost:3000/health-check',
            interval: '10s'
        }
    }

    consul.agent.service.register(options, (err, result) => {
        if (err) {
            console.error(err);
            setTimeout(register, 5000); // TODO fibo backoff
            return;
        }

        console.log('Registration successful')
    });
}

register();
