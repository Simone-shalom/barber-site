import {Ratelimit} from '@upstash/ratelimit'
import {Redis} from '@upstash/redis'

export async function ratelimit(identifier: string) {
    const  rateLimit = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(2, '60s'),
        analytics: true,
        prefix: '@upstash/ratelimit'
    })

    return await rateLimit.limit(identifier)
}