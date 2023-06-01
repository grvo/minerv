// imports
import ConnectionMonitor from '~/actioncable_connection_monitor';

describe('ConnectionMonitor', () => {
    let monitor;

    beforeEach(() => {
        monitor = new ConnectionMonitor({});
    });

    describe('#getPollInterval', () => {
        beforeEach(() => {
            Math.originalRandom = Math.random;
        });

        afterEach(() => {
            Math.random = Math.originalRandom;
        });

        const { staleThreshold, reconnectionBackoffRate } = ConnectionMonitor;
        const backoffFactor = 1 + reconnectionBackoffRate;
        const ms = 1000;

        it('usa backoff exponencial', () => {
            Math.random = () => 0;

            monitor.reconnectAttempts = 0;
            expect(monitor.getPollInterval()).toEqual(staleThreshold * ms);

            monitor.reconnectAttempts = 1;
            expect(monitor.getPollInterval()).toEqual(staleThreshold * backoffFactor * ms);

            monitor.reconnectAttempts = 2;
            expect(monitor.getPollInterval()).toEqual(staleThreshold * backoffFactor * backoffFactor * ms);
        });

        it('limita a espera exponencial após um certo número de tentativas de reconexão', () => {
            Math.random = () => 0;

            monitor.reconnectAttempts = 42;
            const cappedPollInterval = monitor.getPollInterval();

            monitor.reconnectAttempts = 9001;
            expect(monitor.getPollInterval()).toEqual(cappedPollInterval);
        });

        it('usa 100% de jitter quando 0 tentativas de reconexão', () => {
            Math.random = () => 0;
            expect(monitor.getPollInterval()).toEqual(staleThreshold * ms);

            Math.random = () => 0.5;
            expect(monitor.getPollInterval()).toEqual(staleThreshold * 1.5 * ms);
        });

        it('usa reconnectionBackoffRate para jitter quando >0 tentativas de reconexão', () => {
            monitor.reconnectAttempts = 1;

            Math.random = () => 0.25;

            expect(monitor.getPollInterval()).toEqual(
                staleThreshold * backoffFactor * (1 + reconnectionBackoffRate * 0.25) * ms,
            );

            Math.random = () => 0.5;

            expect(monitor.getPollInterval()).toEqual(
                staleThreshold * backoffFactor * (1 + reconnectionBackoffRate * 0.5) * ms,
            );
        });

        it('aplica jitter após recuo exponencial limitado', () => {
            monitor.reconnectAttempts = 9001;

            Math.random = () => 0;
            const withoutJitter = monitor.getPollInterval();

            Math.random = () => 0.5;
            const withJitter = monitor.getPollInterval();

            expect(withJitter).toBeGreaterThan(withoutJitter);
        });
    });
});