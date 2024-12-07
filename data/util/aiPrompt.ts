import anthropic from '../lib/anthropic'
import sentenceCase from './sentenceCase'
import sleep from './sleep'

// Uses Claude AI to generate text based on a given prompt
const aiPromptText = async (text: string, prompt: string): Promise<string> => {
    const maxRetries = 3
    let attempts = 0

    while (attempts < maxRetries) {
        try {
            const message = await anthropic.messages.create({
                model: 'claude-3-haiku-20240307',
                max_tokens: 300, // Limit response length
                messages: [
                    {
                        role: 'user',
                        content: `${prompt}\n\n${text}`,
                    },
                ],
            })

            // @ts-ignore
            return message.content[0].text
        } catch (error) {
            attempts++
            if (attempts < maxRetries) {
                await sleep(1000) // Wait 1 second before retrying
                continue
            }
            console.error('Error prompting AI with text:', error)
            throw error
        }
    }
    throw new Error('Max retries exceeded')
}

// Takes a list of strings, combines them, and prompts Claude AI with a given prompt
const aiPromptList = async (
    list: string[],
    prompt: string
): Promise<string[]> => {
    const maxRetries = 3
    let attempts = 0

    while (attempts < maxRetries) {
        try {
            // Join list items with pipe character for processing
            const text = list.join(' | ')

            const message = await anthropic.messages.create({
                model: 'claude-3-haiku-20240307',
                max_tokens: 300, // Limit response length
                messages: [
                    {
                        role: 'user',
                        content: `${prompt}.\nPlease separate your response with "|".\n\n${text}`,
                    },
                ],
            })

            // @ts-ignore
            const content: string = message.content[0].text

            const points = content
                .split('|')
                .map(item => sentenceCase(item.trim())) // Clean up and standardize each point
                .filter(item => item.length > 0) // Remove empty items

            return points
        } catch (error) {
            attempts++
            if (attempts < maxRetries) {
                await sleep(1000) // Wait 1 second before retrying
                continue
            }
            console.error('Error prompting AI with list:', error)
            throw error
        }
    }
    throw new Error('Max retries exceeded')
}

export { aiPromptText, aiPromptList }
