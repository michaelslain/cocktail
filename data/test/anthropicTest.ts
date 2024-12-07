import anthropic from '../lib/anthropic'

const testAnthropic = async () => {
    try {
        console.log('Testing Anthropic API connection...')

        const message = await anthropic.messages.create({
            model: 'claude-3-haiku-20240307',
            max_tokens: 100,
            messages: [
                {
                    role: 'user',
                    content:
                        'Please respond with "Hello World" to test the connection.',
                },
            ],
        })

        console.log(message)
        // @ts-ignore
        console.log('Response received:', message.content.text)
        console.log('Test completed successfully!')
    } catch (error) {
        console.error('Error testing Anthropic API:', error)
        throw error
    }
}

// Run the test
testAnthropic()
