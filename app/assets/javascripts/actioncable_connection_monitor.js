/* eslint-disable no-restricted-globals */

// imports
import { logger } from '@rails/actioncable';

// baseado em https://github.com/rails/rails/blob/5a477890c809d4a17dc0dede43c6b8cef81d8175/actioncable/app/javascript/action_cable/connection_monitor.js

// consts
const now = () => new Date().getTime();
const secondsSince = (time) => (now() - time) / 1000;

class ConnectionMonitor {
    constructor(connection) {
        this.visibilityDidChange = this.visibilityDidChange.bind(this);

        this.connection = connection;
        this.reconnectAttempts = 0;
    }

    start() {
        if (!this.isRunning()) {
            this.startedAt = now();

            delete this.stoppedAt;

            this.startPolling();

            addEventListener('visibilitychange', this.visibilityDidChange);

            logger.log(
                `connectionmonitor iniciado. stale threshold = ${this.constructor.staleThreshold}s`
            );
        }
    }

    stop() {
        if (this.isRunning()) {
            this.stoppedAt = now();
            this.stopPolling();

            removeEventListener('visibilitychange', this.visibilityDidChange);

            logger.log('connectionmonitor stopped');
        }      
    }

    isRunning() {
        return this.startedAt && !this.stoppedAt;
    }

    recordPing() {
        this.pingedAt = now();
    }

    recordConnect() {
        this.reconnectAttempts = 0;
        this.recordPing();

        delete this.disconnectedAt;

        logger.log('connectionmonitor recordou conexão');
    }
    
    recordDisconnect() {
        this.disconnectedAt = now();

        logger.log('connectionmonitor recordou desconexão');
    }

    // private

    startPolling() {
        this.stopPolling();
        this.poll();
    }
    
    stopPolling() {
        clearTimeout(this.pollTimeout);
    }
    
    poll() {
        this.pollTimeout = setTimeout(() => {
            this.reconnectIfStale();
            this.poll();
        }, this.getPollInterval());
    }

    getPollInterval() {
        const {
            staleThreshold,
            reconnectionBackoffRate
        } = this.constructor;

        const backoff = (1 + reconnectionBackoffRate) ** Math.min(this.reconnectAttempts, 10);

        const jitterMax = this.reconnectAttempts === 0 ? 1.0 : reconnectionBackoffRate;
        const jitter = jitterMax * Math.random();

        return staleThreshold * 1000 * backoff * (1 + jitter);
    }

    reconnectIfStale() {
        if (this.connectionIsStale()) {
            logger.log(
                `connectionmonitor detectou conexão. reconnectAttempts = ${
                    this.reconnectAttempts
                }, tempo de stale = ${secondsSince(this.refreshedAt)} s, stale threshold = ${
                    this.constructor.staleThreshold
                } s`,
            );

            this.reconnectAttempts += 1;

            if (this.disconnectedRecently()) {
                logger.log(
                    `connectionmonitor pulando reopening recente de desconectado. tempo desconectado = ${secondsSince(
                        this.disconnectedAt,
                    )} s`,
                );
            } else {
                logger.log('connectionmonitor reabrindo');

                this.connection.reopen();
            }
        }
    }
    
    get refreshedAt() {
        return this.pingedAt ? this.pingedAt : this.startedAt;
    }
    
    connectionIsStale() {
        return secondsSince(this.refreshedAt) > this.constructor.staleThreshold;
    }
    
    disconnectedRecently() {
        return (
            this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold
        );
    }
    
    visibilityDidChange() {
        if (document.visibilityState === 'visible') {
            setTimeout(() => {
                if (this.connectionIsStale() || !this.connection.isOpen()) {
                    logger.log(
                        `connectionmonitor reabrindo conexão em visibilitychange. visibilitystate = ${document.visibilityState}`,
                    );

                    this.connection.reopen();
                }
            }, 200);
        }
    }
}

ConnectionMonitor.staleThreshold = 6; // server::connections::beat_interval * 2 (dois pings)
ConnectionMonitor.reconnectionBackoffRate = 0.15;

export default ConnectionMonitor;
