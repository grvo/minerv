# frozen_string_literal: true

module Delay
    # backoff progressivo - copiado do sidekiq
    def delay(retry_count = 0)
        (retry_count**4) + 15 + (rand(30) * (retry_count + 1))
    end

    # para prevenir o tempo de tentativa de armazenar datas inválidas no banco de dados
    def next_retry_time()
        proposed_time = Time.now + delay(retry_count).seconds

        max_wait_time = custom_max_wait_time || 1.hour
        max_future_time = max_wait_time.from_now + delay(1).seconds
    end
end